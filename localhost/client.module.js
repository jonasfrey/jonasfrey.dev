
import {
    f_add_css,
    f_s_css_prefixed,
    o_variables, 
    f_s_css_from_o_variables
} from "https://deno.land/x/f_add_css@2.0.0/mod.js"

import {
    f_o_html_from_o_js,
    f_o_proxified_and_add_listeners,
    f_o_js_a_o_toast,
    f_o_toast,
    o_state_a_o_toast,
    s_css_a_o_toast
} from "https://deno.land/x/handyhelpers@5.2.4/mod.js"


// import { Boolean } from '/three.js-r126/examples/jsm/math/BooleanOperation.js';
// import { STLExporter } from '/three/STLExporter.js';
// if you need more addons/examples download from here...
//  
let s_id_error_msg = 'error_msg'
o_variables.n_rem_font_size_base = 1. // adjust font size, other variables can also be adapted before adding the css to the dom
o_variables.n_rem_padding_interactive_elements = 0.5; // adjust padding for interactive elements 
f_add_css(
    `

    #${s_id_error_msg}{
        position: absolute;
        width: 100%;
        top: 0;
        background: #f5c0c099;
        color: #5e0505;
        padding: 1rem;
        z-index: 111;
    }
    .app{
        max-width: 100vw;
        style: "display: flex;
        flex-direction: row;

        background-size:cover;
    }
    .a_o_cv_section{
        position:relative;
    }
    .o_cv_section {
        margin: 3rem 0;
        position:relative;
        display: flex;
        flex-direction: row;
        z-index:1;
        padding-left: 1rem;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 1rem;
    }
    .o_cv_section .title{
        display:flex;
        display:flex;
        align-items:center;
        margin-left: 1rem;
    }

    .a_o_cv_section .line{
        z-index:0;
        width: 10px; 
        height: 95%; 
        background: black;
        position:absolute;
        top: 2.5%;
        left:2rem   ;
        animation: growHeight 2s ease-in-out forwards;
    }


    @keyframes growHeight {
    from {
        height: 2.5%;
    }
    to {
        height: 95%;
    }
    }
    .a_o_cv_section div{ 
        flex: 0 0 auto;
    }
    .a_o_cv_section .year{
        border-radius: 50%;
        width: 50px;
        height: 50px;
        text-align:center;
        display:flex;
        align-items:center;
        justify-content:center; 
        background: rgba(0,0,0,0.8);
    }
    .a_o_project{
        display:flex;
        flex-wrap: wrap;
        flex-direction: row;
    }
    .o_project{
        display:flex;
        align-items: center;
        justify-content:center;
        width: 50%;
        aspect-ratio: 2/1;
    }
    a{
        background: rgba(0,0,0,0.6);
        padding: 1rem !important; 
        border-radius: 1rem;
    }
        
    ${s_css_a_o_toast}
    ${
        f_s_css_from_o_variables(
            o_variables
        )
    }
    `
);




let f_callback_beforevaluechange = function(a_s_path, v_old, v_new){
    // console.log('a_s_path')
    // console.log(a_s_path)
    // let s_path = a_s_path.join('.');
    // if(s_path == 'a_o_person.0.s_name'){
    //     console.log('name of first person will be changed')
    // }
}
let f_callback_aftervaluechange = function(a_s_path, v_old, v_new){
    // console.log('a_s_path')
    // console.log(a_s_path)
    // let s_path = a_s_path.join('.');
    // if(s_path == 'n_thickness'){
    //     f_update_rendering();
    // }
}

let o_div = document;
let o_blob_stl = null;
// let a_o_license = await(await fetch('https://api.sketchfab.com/v3/licenses')).json()
// let a_o_category = await(await(fetch('https://api.sketchfab.com/v3/categories'))).json()

function f_s_error_from_s_prop_value(s_prop, value) {
    if (typeof s_prop !== 'string') {
      return ('s_prop must be a string');
    }
    if (s_prop.startsWith('s_')) {
      if (typeof value !== 'string') {
        return (`Value for s_prop '${s_prop}' must be a string`);
      }
    } else if (s_prop.startsWith('n_')) {
      if (typeof value !== 'number' || isNaN(value)) {
        return (`Value for s_prop '${s_prop}' must be a number`);
      }
    } else if (s_prop.startsWith('a_')) {
      if (!Array.isArray(value)) {
        return (`Value for s_prop '${s_prop}' must be an array`);
      }
    } else if (s_prop.startsWith('b_')) {
      if (typeof value !== 'boolean') {
        return (`Value for s_prop '${s_prop}' must be a boolean`);
      }
    } else if (s_prop.startsWith('o_')) {
      if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return (`Value for s_prop '${s_prop}' must be an object`);
      }
    } else {
      return (`s_prop '${s_prop}' has no recognized prefix`);
    }
  
    return '';
  }
  

let f_a_o_error_type = function(
    o
){
    let a_o_error = []
    for(let s_prop in o){
        let s = f_s_error_from_s_prop_value(
            s_prop, 
            o[s_prop]
        );
        if(s != ''){
            a_o_error.push(
                {
                    s, 
                    s_prop, 
                    value: o[s_prop]
                }
            )
        }
    }
    return a_o_error
}
let f_o_check_types_and_potentially_throw_error = function(
    o
){
    let a_o_error = f_a_o_error_type(o);
    if(a_o_error.length > 0){
        throw new Error(`object has type error(s): ${JSON.stringify(a_o_error, null, 4)}`);
    }
    return o

}
let f_o_cv_section = function(
    s_title,
    s_description, 
    n_year_from,
    n_year_to 
){
    return f_o_check_types_and_potentially_throw_error({
        s_title, 
        s_description, 
        n_year_from, 
        n_year_to
    });

}
let f_o_project = function(
    s_title,
    s_description, 
    s_url,
    s_url_image
){
    return f_o_check_types_and_potentially_throw_error({
        s_title,
        s_description, 
        s_url,
        s_url_image
    });
}
let o_state = f_o_proxified_and_add_listeners(
    {
        
        a_o_cv_section: [
            f_o_cv_section(
                'Primarschule Wohlen b. Bern', 
                'Als kind wuchs ich in Wohlen bei bern auf. Daher lag es auf der hand auch dort die schule zu besuchen, was ich auch tat.', 
                2004, 
                2010
            ), 
            f_o_cv_section(
                'Sekundarstufe Oberstufenschule Hinterkappelen', 
                'Die oberstufenschule habe ich in hinterkappelen absolviert.', 
                2010, 
                2013
            ), 
            f_o_cv_section(
                'Computerschule Bern (Basisschuljahr)', 
                'Nach abschluss der sekundarstufe habe ich meine informatikkentnisse durch ein basisschuljahr gestärkt, während dieses Jahrs habe ich auch eine vertiefte suche nach einer lehrstelle angetreten.',
                2013, 
                2014
            ), 
            f_o_cv_section(
                'Computerschule Bern (Informatiker /EFZ)', 
                '', 
                2014, 
                2016
            ), 
            f_o_cv_section(
                'Konvert AG (Praktikum und IPA)', 
                '', 
                2016, 
                2018
            ),
            f_o_cv_section(
                'Universität Bern (Center for Space and Habitability)', 
                '', 
                2019, 
                2025
            )
        ], 
        a_o_project: [
            f_o_project(
                'Stellarium Gornergrat (Web-Entwickler)',
                'Seit 2019 arbeite ich an der Webplattform für das Stellarium Gornergrat.',
                'https://stellarium-gornergrat.ch/', 
                './stellarium.jpg'
            ),
            f_o_project(
                'Open-Source',
                'Als Informatiker und Applikationsentwickler bin ich grosser Fan von Open source. Vieles von meinem source code (über 140 repositories) hoste ich deshalb für alle zugänglich auf github',
                'https://github.com/jonasfrey',
                './github.jpg'
            ),
            f_o_project(
                'GPU Programming (Shadertoy)',
                'Als Informatiker und Applikationsentwickler bin ich grosser Fan von Open source. Vieles von meinem source code (über 140 repositories) hoste ich deshalb für alle zugänglich auf github',
                'https://www.shadertoy.com/user/jonasfrey',
                './shadertoy.jpeg'
            ),
            f_o_project(
                'Fotografie',
                '',
                'https://unsplash.com/@jonasfrey',
                './jonas-frey-SvceOClvhsA-unsplash.jpg'
            )
        ],
        ...o_state_a_o_toast,
    }, 
    f_callback_beforevaluechange,
    f_callback_aftervaluechange, 
    o_div
)

globalThis.o_state = o_state

globalThis.f_o_toast = f_o_toast
let o_el_svg = null;
// then we build the html
f_o_toast('this is info', 'info', 5000)
f_o_toast('this is warning','warning', 5000)
f_o_toast('this is error','error', 5000)
f_o_toast('this will take a while','loading', 5000)


let o = await f_o_html_from_o_js(
    {
        class: "app",
        f_a_o: ()=>{
            return [

                {
                    style: 'display:flex',
                    f_a_o: ()=>{
                        return [
                            {
                                s_tag: 'image', 
                                style: "aspect-ratio:1/1;width:50%;background-image: url('./jonas.jpg');background-size:cover;background-position:center",
                            },
                            {
                                style: "width:50%;display:flex; flex-direction:column;align-items:center;justify-content:center;padding:1rem",
                                f_a_o: ()=>{
                                    return [
                                        {
                                            s_tag: "h2", 
                                            innerText: "Hallo 👋", 
                                        },
                                        {
                                            innerText: `Ich bin Jonas Frey
Informatiker mit Leidenschaft für stabilen sauberen Code, effiziente Systeme und innovative Lösungen.
Seit über 6 Jahren arbeite ich in den Bereichen Softwareentwicklung und Systemarchitektur. 
Mein Fokus liegt auf der Entwicklung kleiner Anwendungen, der Automatisierung komplexer Prozesse und dem Einsatz moderner Technologien wie z. B. Python, Javascript (Denojs), Docker.
Wenn Sie jemanden suchen, der Technik verständlich macht und Projekte mit Weitblick umsetzt, sind Sie hier genau richtig.`
                                        },
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    s_tag: 'h2', 
                    innerText: 'Lebenslauf'
                },
                {
                    class: "a_o_cv_section",
                    f_a_o: ()=>{
                        return [
                            {
                                class: 'line',
                            },
                            ...o_state.a_o_cv_section.map(o_cv_section=>{
                                return {
                                    class: 'o_cv_section',
                                    f_a_o: ()=>{
                                        return [
                                            {
                                                class: "year",
                                                // innerText: `${o_cv_section.n_year_from}-${o_cv_section.n_year_to}`, 
                                                innerText: `${o_cv_section.n_year_from}`, 
                                            },
                                            {
                                                class: "title",
                                                innerText: o_cv_section.s_title, 
                                            },
                                            // {
                                            //     class: 'description',
                                            //     innerText: o_cv_section.s_description, 
                                            // }
                                        ]
                                    }
                                }
                            })
                        ]
                    }, 
                },
                {
                    s_tag: "h2", 
                    innerText: "Projekte"
                },
                {
                    class: 'a_o_project',
                    f_a_o: ()=>{
                        return [
                            ...o_state.a_o_project.map(o_project=>{
                                return {
                                    class: 'o_project',
                                    style: `background-image:url(${o_project.s_url_image}); background-size:cover; background-position:center;`,
                                    f_a_o: ()=>{
                                        return [
                                            {
                                                class: 'title',
                                                s_tag: 'a',
                                                href: o_project.s_url, 
                                                innerText: o_project.s_title,
                                            }
                                        ]
                                    }
                                }
                            })
                        ]
                    }
                }
            ]
        },
    }, 
    o_state
)
document.body.appendChild(o);
