import {
    f_websersocket_serve,
    f_v_before_return_response__fileserver
} from "https://deno.land/x/websersocket@5.0.0/mod.js"

import {
    O_ws_client
} from "./classes.module.js"
import { ensureDir } from "https://deno.land/std@0.224.0/fs/ensure_dir.ts";

import { f_o_config } from "./functions.module.js";
import {
    f_a_o_entry__from_s_path
} from "https://deno.land/x/handyhelpers@5.1.6/mod.js"

import {
    f_s_ymd__from_n_ts_ms_utc,
} from "https://deno.land/x/date_functions@2.0.0/mod.js"
let s_path_abs_file_current = new URL(import.meta.url).pathname;
let s_path_abs_folder_current = s_path_abs_file_current.split('/').slice(0, -1).join('/');
const b_deno_deploy = Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;

let a_o_ws_client = []

// const o_kv = await Deno.openKv();
// let o_config = await f_o_config();
// console.log({o_config});

// let s_path_abs_folder_cached_shaders = './folder_to_ensure';
// if(!b_deno_deploy){
//     await ensureDir(s_path_abs_folder_cached_shaders)// deno deploy is read only...
// }

let f_handler = async function(o_request){
    console.log(o_request.conn);
    let s_path_folder__log = './logs';
    await ensureDir(s_path_folder__log);
    let s_ymd_hms = f_s_ymd__from_n_ts_ms_utc(new Date().getTime());
    let s_path_a_o_request_today = `${s_path_folder__log}/${s_ymd_hms}.json`;
    let s_json = '[]'
    try {
        s_json = await Deno.readTextFile(s_path_a_o_request_today)
    } catch (error) {
        console.log(error)
    }
    // console.log(s_json)
    let a_o = JSON.parse(s_json);
    a_o.push(o_request);
    await Deno.writeTextFile(s_path_a_o_request_today,JSON.stringify(a_o, null, 4));
    // websocket 'request' handling here
    if(o_request.headers.get('Upgrade') == 'websocket'){

        const {
            socket: o_socket,
            response: o_response
        } = Deno.upgradeWebSocket(o_request);
        let o_ws_client = new O_ws_client(
            crypto.randomUUID(),
            o_socket
        )
        a_o_ws_client.push(o_ws_client);

        o_socket.addEventListener("open", (o_e) => {
            console.log({
                o_e, 
                s: 'o_socket.open called'
            })
        });

        o_socket.addEventListener("message", async (o_e) => {
            console.log({
                o_e, 
                s: 'o_socket.message called'
            })
            let v_data = o_e.data;
            a_o_ws_client
                .filter(o=>o!=o_ws_client)  // send to all other clients, comment out to send to all clients
                .forEach(o=>{
                    o.o_socket.send('message was received from a client')

                })
        });
        o_socket.addEventListener("close", async (o_e) => {
            a_o_ws_client.splice(a_o_ws_client.indexOf(o_ws_client), 1);
            console.log({
                o_e, 
                s: 'o_socket.close called'
            })
        });

        return o_response;
    }
    // normal http request handling here
    let o_url = new URL(o_request.url);
    if(o_url.pathname == '/a_o_media'){
        let s_path = 'localhost/images/artwork_postprocessed'
        let s_path_public = s_path.split('/').slice(1).join('/')
        let a_o_media = await f_a_o_entry__from_s_path(s_path);
        a_o_media = a_o_media
        .filter(o=>{
            return o.name.endsWith('jpg')
        })
        .map(o=>{
            o.s_path_public = `${s_path_public}/${o.name}`
            return o
        })
        let o_resp = new Response(
            JSON.stringify(
                a_o_media
            ),
            { 
                headers: {
                    'Content-type': "application/json"
                }
            }
        )
        return o_resp
    }
    if(o_url.pathname == '/'){
        return new Response(
            await Deno.readTextFile(
                `${s_path_abs_folder_current}/localhost/client.html`
            ),
            { 
                headers: {
                    'Content-type': "text/html"
                }
            }
        );
    }
    if(o_url.pathname == '/some_endpoint'){
        let o_post_data = o_request.json();
        return new Response(
            JSON.stringify(
                {
                    s: 'some response',
                    b_success: true
                }
            ),
            { 
                headers: {
                    'Content-type': "application/json"
                }
            }
        );
    }

    return f_v_before_return_response__fileserver(
        o_request,
        `${s_path_abs_folder_current}/localhost/`
    )

}

let s_name_host = Deno.hostname(); // or maybe some ip adress 112.35.8.13
let b_development = s_name_host != 'katjahabegger.ch';
// b_development = false;
let s_name_host2 = (b_development) ? 'localhost': s_name_host;
let o_info_certificates = {
    s_path_certificate_file: 
        (b_development)
            ? './self_signed_cert_9026a3da-59b4-4ecd-b983-dc3edb9c3ab8.crt'
            : '/etc/letsencrypt/live/katjahabegger.ch/cert.pem',
    s_path_key_file: 
        (b_development)
            ? './self_signed_key_9026a3da-59b4-4ecd-b983-dc3edb9c3ab8.key'
            : '/etc/letsencrypt/live/katjahabegger.ch/privkey.pem'
    }
if(!b_development){
    s_name_host = '0.0.0.0'
}
await f_websersocket_serve(
    [
        {
            n_port: (b_development) ? 8080 : 80,
            b_https: false,
            s_hostname: s_name_host,
            f_v_before_return_response: f_handler
        },
        ...[
            (!b_deno_deploy) ? {
                ...o_info_certificates,
                n_port: (b_development) ? 8443: 443,
                b_https: true,
                s_hostname: s_name_host,
                f_v_before_return_response: f_handler
            } : false
        ].filter(v=>v)   
    ]
);