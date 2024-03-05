<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <!-- <link rel="stylesheet" href="style.css"> -->

    <style>
    body {
        margin: 0;
        padding: 0;
        background-color: #f2f2f2;
    }

    /*Estilos para el fondo*/
    .fondo {
        background-color: #f2f2f2;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }

    .fondo h1 {
        text-align: center;
        padding-top: 50px;
        font-size: 24px;
        color: #333;
    }

    /*Estilos para la tarjeta*/
    .tarjeta {
        background-color: #fff;
        width: 80%;
        max-width: 500px;
        margin: 100px auto;
        padding: 20px;
        border-radius: 10px;
        z-index: 1;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .tarjeta h2 {
        text-align: center;
        font-size: 18px;
        margin-bottom: 10px;
    }

    .tarjeta ul {
        list-style: none;
        padding: 0;
    }

    .tarjeta li {
        padding: 5px 0;
        border-bottom: 1px solid #ddd;
    }

    .tarjeta li:last-child {
        border-bottom: none;
    }


    /* Footer 
    
    
    */

    .footer {
        background-color: #333;
        color: #fff;
        text-align: center;
        bottom: 0;
        left: 10%;
        width: 100%;
        box-sizing: border-box;
    }

    .footer a {
        margin: 0 5px;
    }

    .socials-container {
        width: 80%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 25px;
        padding: 20px 40px;
        background-color: #333333;
    }

    .social {
        width: 5vw;
        height: 5vw;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid rgb(194, 194, 194);
    }

    .twitter:hover {
        background: #000000;
        ;
    }

    .facebook:hover {
        background: linear-gradient(45deg, #00f2ea, #000000, #ff0050);
    }

    .google-plus:hover {
        background: linear-gradient(45deg, #872419, #db4a39, #ff7061);
    }

    .instagram:hover {
        background: #f09433;
        background: -moz-linear-gradient(45deg,
                #f09433 0%,
                #e6683c 25%,
                #dc2743 50%,
                #cc2366 75%,
                #bc1888 100%);
        background: -webkit-linear-gradient(45deg,
                #f09433 0%,
                #e6683c 25%,
                #dc2743 50%,
                #cc2366 75%,
                #bc1888 100%);
        background: linear-gradient(45deg,
                #f09433 0%,
                #e6683c 25%,
                #dc2743 50%,
                #cc2366 75%,
                #bc1888 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#f09433', endColorstr='#bc1888', GradientType=1);
    }

    .social svg {
        fill: white;
        height: 20px;
    }


    .datos {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }

    .columna1,
    .columna3 {
        padding: 5px;
        border-radius: 5px;
    }

    .columna3 {
        margin-right: 10%;
    }

    .columna1 {
        margin-left: 10%;
    }

    .columna1 ul {
        list-style: none;
        padding: 0;
    }

    .columna1 li {
        padding: 5px 0;
        border-bottom: 1px solid #ddd;
    }

    .columna1 li:last-child {
        border-bottom: none;
    }


    @media (max-width: 768px) {
        .datos {
            flex-direction: column;
        }

        .columna1 {
            margin-left: 0;
            margin: 2% 0;
        }

        .columna3 {
            margin-right: 0;
            margin-bottom: 2%;
        }
    }

    .page-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        /* Ensures the page always has full height */
    }
    </style>

</head>

<body>

    <div class="page-container">

        <div class="fondo">
            <h1>Cinunivers</h1>
        </div>

        <div class="tarjeta">
            <h2>Facturación de compra</h2>

            <ul>
                <li><strong> Cliente: </strong> {{$data['cliente']}} </li>
                <li><strong> Pelicula: </strong> {{$data['pelicula']}} </li>
                <li><strong> Sala: </strong> {{$data['sala']}} </li>
                <li><strong> Horario: </strong> {{$data['horario']}} </li>
                <li><strong> Asientos: </strong> {{$data['asientos']}} </li>
                <li><strong> Entradas: </strong> {{$data['servicio']}} </li>
                <li><strong> Servicio: </strong> {{$data['servicio']}} </li>
                <li><strong> Servicio web: </strong> {{$data['web']}} </li>
                <li><strong> Base Imponible: </strong> {{$data['base']}} </li>
                <li><strong> Iva: </strong> {{$data['iva']}} </li>
                <li><strong> Total Bs.D: </strong> {{$data['total']}} </li>
                <li><strong> Total REF: </strong> {{$data['totalUSD']}} </li>
            </ul>
        </div>

        <div class="footer">

            <div class="datos">

                <div class="columna1">

                    <ul>
                        <li><strong>Email:</strong> cinunivers@gmail.com</li>
                        <li><strong>Telefono:</strong> +241-478-4634</li>
                        <li><strong>Sitio web:</strong> Sala A</li>
                    </ul>

                </div>

                <div class="columna3">

                    <ul>
                        <li><strong>Email:</strong> cinunivers@gmail.com</li>
                        <li><strong>Telefono:</strong> +241-478-4634</li>
                        <li><strong>Sitio web:</strong> Sala A</li>
                    </ul>

                </div>

            </div>


            <div class="socials-container">

                <a href="https://twitter.com/LA_UJAP?t=WNlqn7wKHeLGhjUzZHLVeg&s=09" class="social twitter">
                    <svg fill="white" class="svgIcon" xmlns="http://www.w3.org/2000/svg" width="25px" height="25px"
                        viewBox="0 0 564 564">
                        <path
                            d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z">
                        </path>
                    </svg>
                </a>

                <a href="https://www.tiktok.com/@ujapoficial?_t=8kNiEmMTR2c&_r=1" class="social facebook">

                    <svg viewBox="0 0 19.738 22.466" height="22.466" width="19.738" xmlns="http://www.w3.org/2000/svg"
                        data-name="Group 101" id="Group_101">
                        <path fill="white" transform="translate(-31.423 -0.39)"
                            d="M51.151,6.015a5.661,5.661,0,0,1-3.42-1.143A5.662,5.662,0,0,1,45.469.39H41.8V10.414l0,5.49a3.325,3.325,0,1,1-2.281-3.151V9.029a7.218,7.218,0,0,0-1.058-.078,7.034,7.034,0,0,0-5.286,2.364,6.893,6.893,0,0,0,.311,9.505,7.158,7.158,0,0,0,.663.579,7.035,7.035,0,0,0,4.312,1.458,7.219,7.219,0,0,0,1.058-.078,7.011,7.011,0,0,0,3.917-1.959,6.868,6.868,0,0,0,2.06-4.887l-.019-8.2a9.3,9.3,0,0,0,5.688,1.933V6.014h-.011Z"
                            data-name="Path 6566" id="Path_6566"></path>
                    </svg>
                </a>

                <a href="https://maps.app.goo.gl/ZwsdKKkPW2zgqEft8" class="social google-plus">
                    <svg height="1em" viewBox="0 0 640 512">
                        <path
                            d="M386.061 228.496c1.834 9.692 3.143 19.384 3.143 31.956C389.204 370.205 315.599 448 204.8 448c-106.084 0-192-85.915-192-192s85.916-192 192-192c51.864 0 95.083 18.859 128.611 50.292l-52.126 50.03c-14.145-13.621-39.028-29.599-76.485-29.599-65.484 0-118.92 54.221-118.92 121.277 0 67.056 53.436 121.277 118.92 121.277 75.961 0 104.513-54.745 108.965-82.773H204.8v-66.009h181.261zm185.406 6.437V179.2h-56.001v55.733h-55.733v56.001h55.733v55.733h56.001v-55.733H627.2v-56.001h-55.733z">
                        </path>
                    </svg>
                </a>

                <a href="https://www.instagram.com/ujap_oficial?igsh=MXR3Njg2d3dsbWp3cA==" class="social instagram"><svg
                        height="1em" viewBox="0 0 448 512">
                        <path
                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z">
                        </path>
                    </svg></a>
            </div>
        </div>

    </div>

</body>

</html>