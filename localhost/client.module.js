
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

let s_id_error_msg = 'error_msg'
o_variables.n_rem_font_size_base = 1.
o_variables.n_rem_padding_interactive_elements = 0.5;
f_add_css(
    `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after {
        box-sizing: border-box;
    }

    :root {
        --color-bg: #0f0f13;
        --color-surface: #1a1a24;
        --color-surface-hover: #22222e;
        --color-border: #2a2a3a;
        --color-text: #e4e4ef;
        --color-text-muted: #8888a0;
        --color-accent: #6c63ff;
        --color-accent-glow: rgba(108, 99, 255, 0.15);
        --color-white: #ffffff;
        --radius: 0.75rem;
        --radius-lg: 1.25rem;
        --shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
        --transition: 0.2s ease;
    }

    html {
        scroll-behavior: smooth;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        background: var(--color-bg);
        color: var(--color-text);
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
    }

    #${s_id_error_msg}{
        position: fixed;
        width: 100%;
        top: 0;
        background: #f5c0c099;
        color: #5e0505;
        padding: 1rem;
        z-index: 111;
        backdrop-filter: blur(8px);
    }

    .app {
        display: flex;
        flex-direction: row;
        min-height: 100vh;
    }

    /* --- Sticky Left Sidebar (Hero) --- */
    .hero {
        width: 50%;
        height: 100vh;
        position: sticky;
        top: 0;
        overflow: hidden;
    }
    .hero-image {
        position: absolute;
        inset: 0;
        background-size: cover;
        background-position: center;
        z-index: 0;
    }
    .hero::after {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
        background: linear-gradient(180deg, #000000 0%, #000000cc 15%, #00000066 35%, transparent 55%);
        pointer-events: none;
    }
    .hero-text {
        position: relative;
        z-index: 2;
        padding: 2.5rem 2rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .hero-text h1 {
        font-size: 3rem;
        font-weight: 700;
        margin: 0 0 0.35rem;
        color: var(--color-white);
        text-shadow: 0 2px 16px rgba(0,0,0,0.7);
    }
    .hero-text .subtitle {
        font-size: 1.3rem;
        color: var(--color-accent);
        font-weight: 500;
        margin-bottom: 1.25rem;
        text-shadow: 0 2px 10px rgba(0,0,0,0.7);
    }
    .hero-text .bio {
        color: rgba(255,255,255,0.95);
        font-size: 1.05rem;
        line-height: 1.8;
        max-width: 460px;
        text-shadow: 0 1px 8px rgba(0,0,0,0.7);
    }
    .hero-links {
        position: absolute;
        bottom: 2.5rem;
        left: 2rem;
        display: flex;
        gap: 0.75rem;
        z-index: 1;
    }
    .hero-links a {
        color: rgba(255,255,255,0.9);
        text-decoration: none;
        font-size: 0.85rem;
        padding: 0.5rem 1rem !important;
        background: rgba(0,0,0,0.5) !important;
        backdrop-filter: blur(8px);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: var(--radius);
        transition: color var(--transition), border-color var(--transition), background var(--transition);
    }
    .hero-links a:hover {
        color: var(--color-white);
        border-color: var(--color-accent);
        background: rgba(108,99,255,0.3) !important;
    }
    .hero-links .email-link:hover {
        border-color: var(--color-accent);
        background: rgba(108,99,255,0.3) !important;
    }

    /* --- Right Content Area --- */
    .content {
        width: 50%;
        padding: 3rem 2.5rem 4rem;
    }

    /* --- Section Headers --- */
    h2 {
        font-size: 1.35rem;
        font-weight: 600;
        color: var(--color-white);
        margin: 2.5rem 0 1.25rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    h2:first-child {
        margin-top: 0;
    }
    h2::before {
        content: '';
        width: 4px;
        height: 1.5rem;
        background: var(--color-accent);
        border-radius: 2px;
    }

    /* --- Timeline --- */
    .a_o_cv_section {
        position: relative;
        padding-left: 2rem;
    }
    .a_o_cv_section .line {
        position: absolute;
        left: 7px;
        top: 0;
        width: 2px;
        height: 0%;
        background: linear-gradient(to bottom, var(--color-accent), var(--color-border));
        animation: growHeight 1.5s ease-out forwards;
        z-index: 0;
    }
    @keyframes growHeight {
        from { height: 0%; }
        to { height: 100%; }
    }
    .o_cv_section {
        position: relative;
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.25rem;
        padding: 1rem 1.25rem;
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius);
        z-index: 1;
        transition: background var(--transition), border-color var(--transition);
    }
    .o_cv_section:hover {
        background: var(--color-surface-hover);
        border-color: var(--color-accent);
    }
    .o_cv_section .year {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--color-accent);
        color: var(--color-white);
        font-weight: 600;
        font-size: 0.8rem;
        flex-shrink: 0;
    }
    .o_cv_section .title {
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--color-text);
    }

    /* --- Projects Grid --- */
    .a_o_project {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.25rem;
    }
    .o_project {
        position: relative;
        border-radius: var(--radius-lg);
        overflow: hidden;
        aspect-ratio: 16/10;
        background-size: cover;
        background-position: center;
        border: 1px solid var(--color-border);
        transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
    }
    .o_project:hover {
        transform: translateY(-4px);
        border-color: var(--color-accent);
        box-shadow: 0 8px 32px rgba(108, 99, 255, 0.2);
    }
    .o_project .overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 1.25rem;
    }
    .o_project a {
        color: var(--color-white);
        text-decoration: none;
        font-weight: 600;
        font-size: 1rem;
        background: none;
        padding: 0 !important;
        border-radius: 0;
    }
    .o_project .desc {
        color: var(--color-text-muted);
        font-size: 0.8rem;
        margin-top: 0.25rem;
        line-height: 1.4;
    }
    .o_project .tag {
        display: inline-block;
        background: var(--color-accent);
        color: var(--color-white);
        font-size: 0.65rem;
        font-weight: 600;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        margin-bottom: 0.5rem;
        width: fit-content;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    /* --- GitHub Section --- */
    .a_o_github {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
    }
    .o_github_repo {
        background: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: var(--radius);
        padding: 1.25rem;
        transition: background var(--transition), border-color var(--transition), transform var(--transition);
        text-decoration: none;
        display: block;
    }
    .o_github_repo:hover {
        background: var(--color-surface-hover);
        border-color: var(--color-accent);
        transform: translateY(-2px);
    }
    .o_github_repo .repo-name {
        font-weight: 600;
        font-size: 1rem;
        color: var(--color-accent);
        margin-bottom: 0.5rem;
    }
    .o_github_repo .repo-desc {
        color: var(--color-text-muted);
        font-size: 0.85rem;
        line-height: 1.5;
        margin-bottom: 0.75rem;
    }
    .o_github_repo .repo-meta {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 0.75rem;
        color: var(--color-text-muted);
    }
    .o_github_repo .repo-lang {
        display: flex;
        align-items: center;
        gap: 0.35rem;
    }
    .o_github_repo .lang-dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #f1e05a;
    }
    .o_github_repo .repo-stars {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    /* --- Footer --- */
    .footer {
        margin-top: 4rem;
        padding-top: 2rem;
        border-top: 1px solid var(--color-border);
        text-align: center;
        color: var(--color-text-muted);
        font-size: 0.85rem;
    }
    .footer a {
        color: var(--color-accent);
        text-decoration: none;
        background: none;
        padding: 0 !important;
        border-radius: 0;
    }

    /* --- Responsive --- */
    @media (max-width: 860px) {
        .app {
            flex-direction: column;
        }
        .hero {
            width: 100%;
            height: 70vh;
            position: relative;
        }
        .hero-links {
            bottom: 1.5rem;
            left: 1.5rem;
        }
        .hero-text {
            padding: 1.5rem;
        }
        .hero-text h1 {
            font-size: 1.75rem;
        }
        .content {
            width: 100%;
            padding: 2rem 1.5rem 3rem;
        }
        .a_o_project {
            grid-template-columns: 1fr;
        }
        .a_o_github {
            grid-template-columns: 1fr;
        }
    }

    ${s_css_a_o_toast}
    ${
        f_s_css_from_o_variables(
            o_variables
        )
    }
    `
);


let f_callback_beforevaluechange = function(a_s_path, v_old, v_new){}
let f_callback_aftervaluechange = function(a_s_path, v_old, v_new){}

let o_div = document;

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

let f_a_o_error_type = function(o){
    let a_o_error = []
    for(let s_prop in o){
        let s = f_s_error_from_s_prop_value(s_prop, o[s_prop]);
        if(s != ''){
            a_o_error.push({ s, s_prop, value: o[s_prop] })
        }
    }
    return a_o_error
}
let f_o_check_types_and_potentially_throw_error = function(o){
    let a_o_error = f_a_o_error_type(o);
    if(a_o_error.length > 0){
        throw new Error(`object has type error(s): ${JSON.stringify(a_o_error, null, 4)}`);
    }
    return o
}
let f_o_cv_section = function(s_title, s_description, n_year_from, n_year_to){
    return f_o_check_types_and_potentially_throw_error({
        s_title, s_description, n_year_from, n_year_to
    });
}
let f_o_project = function(s_title, s_description, s_url, s_url_image){
    return f_o_check_types_and_potentially_throw_error({
        s_title, s_description, s_url, s_url_image
    });
}

let o_state = f_o_proxified_and_add_listeners(
    {
        a_o_cv_section: [
            f_o_cv_section(
                'Primarschule Wohlen b. Bern',
                'Als kind wuchs ich in Wohlen bei bern auf.',
                2004, 2010
            ),
            f_o_cv_section(
                'Sekundarstufe Oberstufenschule Hinterkappelen',
                'Die oberstufenschule habe ich in hinterkappelen absolviert.',
                2010, 2013
            ),
            f_o_cv_section(
                'Computerschule Bern (Basisschuljahr)',
                'Informatikkenntnisse gestärkt und Lehrstelle gefunden.',
                2013, 2014
            ),
            f_o_cv_section(
                'Computerschule Bern (Informatiker / EFZ)',
                'Ausbildung zum Informatiker mit eidgenössischem Fähigkeitszeugnis.',
                2014, 2016
            ),
            f_o_cv_section(
                'Konvert AG (Praktikum und IPA)',
                'Praktikum und individuelle praktische Arbeit.',
                2016, 2018
            ),
            f_o_cv_section(
                'Universität Bern (Center for Space and Habitability)',
                'Softwareentwicklung im akademischen Umfeld.',
                2019, 2025
            )
        ],
        a_o_project: [
            f_o_project(
                'Stellarium Gornergrat',
                'Web-Plattform für das Stellarium Gornergrat - Ferngesteuertes Observatorium.',
                'https://stellarium-gornergrat.ch/',
                './stellarium.jpg'
            ),
            f_o_project(
                'GPU Programming',
                'Shader-Entwicklung und GPU-basierte Visualisierungen auf Shadertoy.',
                'https://www.shadertoy.com/user/jonasfrey',
                './shadertoy.jpeg'
            ),
            f_o_project(
                'Fotografie',
                'Naturfotografie veröffentlicht auf Unsplash.',
                'https://unsplash.com/@jonasfrey',
                './jonas-frey-SvceOClvhsA-unsplash.jpg'
            ),
            f_o_project(
                'TopoPrints',
                '3D-druckbare Topographie-Modelle der ganzen Welt. Webapplikation zur Modell-Generierung.',
                'https://makerworld.com/en/@TopoPrints',
                './topoprints.jpg'
            ),
            f_o_project(
                'VeryOS',
                '3D-Druck Projekte kombiniert mit OpenSCAD, Mikroelektronik und IoT.',
                'https://makerworld.com/de/@veryOS/upload',
                './veryos.png'
            ),
        ],
        ...o_state_a_o_toast,
    },
    f_callback_beforevaluechange,
    f_callback_aftervaluechange,
    o_div
)

globalThis.o_state = o_state
globalThis.f_o_toast = f_o_toast

let o = await f_o_html_from_o_js(
    {
        class: "app",
        f_a_o: ()=>{
            return [
                // --- Hero (Sticky Left Sidebar with full image) ---
                {
                    class: "hero",
                    f_a_o: ()=>{
                        return [
                            {
                                class: 'hero-image',
                                style: "background-image: url('./jonas.jpg');",
                            },
                            {
                                class: 'hero-text',
                                f_a_o: ()=>{
                                    return [
                                        {
                                            s_tag: "h1",
                                            innerText: "Jonas Frey",
                                        },
                                        {
                                            class: 'subtitle',
                                            innerText: "Software Engineer & System Architect",
                                        },
                                        {
                                            class: 'bio',
                                            innerText: "Informatiker mit Leidenschaft. Ich strebe nach stabilen, sauberen Code, effizienten Systemen und innovativen Lösungen. Seit über 6 Jahren arbeite ich in den Bereichen Softwareentwicklung und Systemarchitektur. Mein Fokus liegt auf der Entwicklung von Anwendungen, der Automatisierung von Prozessen und dem Einsatz moderner Technologien wie JavaScript (Isomorphic), Python, Rust, Docker und SQL."
                                        },
                                    ]
                                }
                            },
                            {
                                class: 'hero-links',
                                f_a_o: ()=>{
                                    return [
                                        {
                                            s_tag: 'a',
                                            href: 'https://github.com/jonasfrey',
                                            target: '_blank',
                                            innerText: 'GitHub',
                                        },
                                        {
                                            class: 'email-link',
                                            style: 'display:flex;align-items:center;color:rgba(255,255,255,0.9);padding:0.5rem 1rem;background:rgba(0,0,0,0.5);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:var(--radius);transition:border-color var(--transition),background var(--transition);cursor:default;',
                                            f_a_o: ()=>{
                                                return [{
                                                    s_tag: 'img',
                                                    src: './email.svg',
                                                    alt: 'Email',
                                                    style: 'height:1em;filter:brightness(0) invert(1);opacity:0.9;',
                                                }]
                                            }
                                        },
                                    ]
                                }
                            }
                        ]
                    }
                },

                // --- Right Content ---
                {
                    class: "content",
                    f_a_o: ()=>{
                        return [

                // --- Lebenslauf ---
                {
                    s_tag: 'h2',
                    innerText: 'Lebenslauf'
                },
                {
                    class: "a_o_cv_section",
                    f_a_o: ()=>{
                        return [
                            { class: 'line' },
                            ...o_state.a_o_cv_section.map(o_cv_section=>{
                                return {
                                    class: 'o_cv_section',
                                    f_a_o: ()=>{
                                        return [
                                            {
                                                class: "year",
                                                innerText: `${o_cv_section.n_year_from}`,
                                            },
                                            {
                                                class: "title",
                                                innerText: o_cv_section.s_title,
                                            },
                                        ]
                                    }
                                }
                            })
                        ]
                    },
                },

                // --- Projekte ---
                {
                    s_tag: "h2",
                    innerText: "Projekte"
                },
                {
                    class: 'a_o_project',
                    f_a_o: ()=>{
                        return o_state.a_o_project.map(o_project=>{
                            return {
                                class: 'o_project',
                                style: `background-image:url(${o_project.s_url_image}); background-size:cover; background-position:center;`,
                                f_a_o: ()=>{
                                    return [
                                        {
                                            class: 'overlay',
                                            f_a_o: ()=>{
                                                return [
                                                    {
                                                        s_tag: 'a',
                                                        href: o_project.s_url,
                                                        target: '_blank',
                                                        innerText: o_project.s_title,
                                                    },
                                                    {
                                                        class: 'desc',
                                                        innerText: o_project.s_description,
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        })
                    }
                },

                // --- GitHub Highlights ---
                {
                    s_tag: "h2",
                    innerText: "GitHub Highlights"
                },
                {
                    class: 'a_o_github',
                    f_a_o: ()=>{
                        let a_o_repo = [
                            { s_name: 'browser_crud_app_template', s_desc: 'Lightweight isomorphic native JavaScript framework for full desktop applications. Basis for most other projects.', s_lang: 'JavaScript', s_stars: '0', s_color: '#f1e05a', s_account: 'jonasfrey' },
                            { s_name: 'video_wizard', s_desc: 'AI-powered video editor. Video to audio to text to video. Intelligent scene detection based on utterances and audio events.', s_lang: 'JavaScript', s_stars: '0', s_color: '#f1e05a', s_account: 'jonasfrey' },
                            { s_name: 'topotransformer', s_desc: '3D-printable models from 2D topography images. Web app to generate terrain of any place on earth.', s_lang: 'JavaScript', s_stars: '0', s_color: '#f1e05a', s_account: 'jonasfrey' },
                            { s_name: 'nvidia_smi_gui', s_desc: 'Simple desktop app to monitor NVIDIA GPU performance in real-time.', s_lang: 'JavaScript', s_stars: '0', s_color: '#f1e05a', s_account: 'veryos-git' },
                            { s_name: 'tea_dunker', s_desc: '3D-printed parts + ESP32 + stepper motor for an automatic tea dunking machine.', s_lang: 'JavaScript', s_stars: '0', s_color: '#f1e05a', s_account: 'veryos-git' },
                            { s_name: 'microscope_motorization', s_desc: 'Software for 3D-printed hardware that automates an optical microscope slide.', s_lang: 'JavaScript', s_stars: '0', s_color: '#f1e05a', s_account: 'veryos-git' },
                        ];
                        return a_o_repo.map(o_repo=>{
                            return {
                                class: 'o_github_repo',
                                s_tag: 'a',
                                href: `https://github.com/${o_repo.s_account}/${o_repo.s_name}`,
                                target: '_blank',
                                f_a_o: ()=>{
                                    return [
                                        {
                                            class: 'repo-name',
                                            innerText: o_repo.s_name,
                                        },
                                        {
                                            class: 'repo-desc',
                                            innerText: o_repo.s_desc,
                                        },
                                        {
                                            class: 'repo-meta',
                                            f_a_o: ()=>{
                                                return [
                                                    {
                                                        class: 'repo-lang',
                                                        f_a_o: ()=>{
                                                            return [
                                                                {
                                                                    class: 'lang-dot',
                                                                    style: `background: ${o_repo.s_color}`,
                                                                },
                                                                {
                                                                    innerText: o_repo.s_lang,
                                                                },
                                                            ]
                                                        }
                                                    },
                                                    ...(parseInt(o_repo.s_stars) > 0 ? [{
                                                        class: 'repo-stars',
                                                        innerText: `\u2605 ${o_repo.s_stars}`,
                                                    }] : []),
                                                ]
                                            }
                                        }
                                    ]
                                }
                            }
                        })
                    }
                },

                // --- Footer ---
                {
                    class: 'footer',
                    f_a_o: ()=>{
                        return [
                            {
                                s_tag: 'a',
                                href: 'https://github.com/jonasfrey',
                                target: '_blank',
                                innerText: 'github.com/jonasfrey',
                            },
                            {
                                style: 'margin-top: 0.5rem;display:flex;align-items:center;gap:0.5rem;',
                                f_a_o: ()=>{
                                    return [{
                                        s_tag: 'img',
                                        src: './email.svg',
                                        alt: 'Email',
                                        style: 'height:1em;filter:brightness(0) invert(1);opacity:0.85;',
                                    }]
                                }
                            },
                            {
                                style: 'margin-top: 0.5rem',
                                innerText: `\u00A9 ${new Date().getFullYear()} Jonas Frey`,
                            }
                        ]
                    }
                }

                        ] // end content f_a_o return
                    } // end content f_a_o
                } // end content div
            ]
        },
    },
    o_state
)
document.body.appendChild(o);
