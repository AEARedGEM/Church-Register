@extends('layouts.notification')

@section('content')
    <!-- Header -->
    <h3 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 600; color: #10b981; text-transform: uppercase; text-align: center;">
        NEW USER REGISTRATION ALERT
    </h3>

    <!-- Greeting -->
    <p style="margin: 0 0 15px 0; font-size: 16px; line-height: 1.5;">Hello Admin,</p>

    <!-- Intro -->
    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.5;">A new user has registered on NYP-IP Portal with the following details:</p>

    <!-- User Details Table -->
    <table class="info-table" style="width: 100%; max-width: 100%; margin: 20px 0; border-collapse: collapse; background: #ffffff; border-radius: 6px; overflow: hidden;">
        <tr>
            <td class="label" style="padding: 12px 15px; border-bottom: 1px solid #000000; font-weight: 600; color: #10b981; width: 35%;">Name</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #000000;">{{ $user->name }}</td>
        </tr>
        <tr>
            <td class="label" style="padding: 12px 15px; border-bottom: 1px solid #000000; font-weight: 600; color: #10b981;">Email Address</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #000000;">{{ $user->email }}</td>
        </tr>
        <tr>
            <td class="label" style="padding: 12px 15px; font-weight: 600; color: #10b981;">Registration Date</td>
            <td style="padding: 12px 15px;">{{ $user->created_at->format('F j, Y \a\t g:i A') }}</td>
        </tr>
    </table>

    <p style="margin: 25px 0 15px 0; font-size: 16px; line-height: 1.5;">You can view and manage this user in the admin dashboard:</p>

    <div style="display: flex; justify-content: center;">
        <a href="{{ $url }}" style="display: inline-block; padding: 12px 25px; background-color: #10b981; color: #ffffff; text-decoration: none; border-radius: 45px; font-weight: 600; margin: 15px 0 25px 0; text-align: center;">
            View User in Admin Dashboard
        </a>
    </div>


    <p style="margin: 0 0 10px 0; font-size: 15px; line-height: 1.5; color: #000000;">
        <strong>IP Address:</strong> {{ request()->ip() ?? 'Not available' }}
    </p>

    <p style="margin: 20px 0 0 0; font-size: 16px; line-height: 1.5;">
        If you  need to verify this registration, please check the admin panel.
    </p>


    @push('styles')
    <style type="text/css">
        @media screen and (max-width: 480px) {
            .info-table td {
                display: block;
                width: 100% !important;
                padding: 8px 0 !important;
                border-bottom: none !important;
            }
            .info-table tr {
                border-bottom: 1px solid #000000;
                padding: 10px 0;
            }
            .info-table tr:last-child {
                border-bottom: none;
            }
            a {
                display: block !important;
                width: 100% !important;
                text-align: center;
                margin: 15px 0 !important;
            }
        }
    </style>
    @endpush
@endsection
