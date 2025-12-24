<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title inertia>{{ config('app.name', 'NYP-IP-Portal') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link rel="icon" href="{{asset('img/favicon.ico')}}" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <meta name="twitter:title" content="NYP-IP Portal | Industrialization" />
        <meta name="twitter:description" content="NYP-IP Is A National-Scale, Youth-Driven Industrialization & Entrepreneurship
         Platform Enabling Nigerian Youths To Become Builders Of Real Industry. Powered by LuxuryX Technologies
          & TradeFi Limited X The Nigerian Youth Parliament." />
        <meta name="twitter:image" content="{{asset('images/nyp-logo.png')}}" />
        <meta name="twitter:card" content="summary" />

        <!-- Open Graph Meta Tags -->
        <meta property="og:title" content="NYP-IP Portal | Industrialization" />
        <meta property="og:description" content="NYP-IP Is A National-Scale, Youth-Driven Industrialization & Entrepreneurship
        Platform Enabling Nigerian Youths To Become Builders Of Real Industry. Powered by LuxuryX Technologies
          & TradeFi Limited X The Nigerian Youth Parliament." />
        <meta property="og:image" content="{{asset('images/nyp-logo.png')}}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nypipportal.luxuryxtech.org.ng" />
        <meta property="og:image:alt" content="NYP-IP Portal" />
        <meta property="og:image:width" content="400">
        <meta property="og:image:height" content="400">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/Pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
