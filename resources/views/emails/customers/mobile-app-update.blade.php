@extends('layouts.notification')

@section('content')
    <div>
        <div class="header" style="padding: 10px 20px; text-align: center;">
            <h2 style="text-align: center; text-transform: uppercase; margin: 0;">NEW APP UPDATE AVAILABLE</h2>
        </div>
    </div>

    <p>Hello {{ $user->name }},</p>

    <p>We're excited to announce a new update for the AFRIData NG mobile app (v{{ $version }})! This release includes important improvements and new features to enhance your experience.</p>

    <div style="background-color: #f8f9fa; border-left: 4px solid #223a5c; padding: 15px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #223a5c;">What's New in This Version</h3>
        <ul style="margin-bottom: 0; padding-left: 20px;">
            @foreach($features as $feature)
            <li style="margin-bottom: 8px;">{{ $feature }}</li>
            @endforeach
        </ul>
    </div>

    <p><strong>Update now to enjoy these improvements:</strong></p>

    <table class="info-table" style="width: 100%; max-width: 500px; margin: 20px 0; border-collapse: collapse;">
        <tr>
            <td class="label" style="padding: 12px 15px; border-bottom: 1px solid #eaeaea; font-weight: 600; color: #333333; width: 35%;">Version</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eaeaea;">{{ $version }}</td>
        </tr>
        <tr>
            <td class="label" style="padding: 12px 15px; border-bottom: 1px solid #eaeaea; font-weight: 600; color: #333333; width: 35%;">Release Date</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eaeaea;">{{ $release_date }}</td>
        </tr>
        <tr>
            <td class="label" style="padding: 12px 15px; border-bottom: 1px solid #eaeaea; font-weight: 600; color: #333333; width: 35%;">Size</td>
            <td style="padding: 12px 15px; border-bottom: 1px solid #eaeaea;">{{ $size }}</td>
        </tr>
    </table>

    <div style="text-align: center; margin: 30px 0;">
        <a href="{{ $update_url }}" class="button" style="display: inline-block; padding: 12px 25px; background-color: #223a5c; color: #ffffff !important; text-decoration: none; border-radius: 4px; font-weight: 600; margin: 15px 0;">
            Update Now
        </a>
    </div>

    <div style="background-color: #fff8e6; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #d39e00;">Important Notes</h3>
        <ul style="margin-bottom: 0; padding-left: 20px;">
            <li style="margin-bottom: 8px;">This update contains important security improvements</li>
            <li style="margin-bottom: 8px;">Some features may require re-authentication</li>
            <li>Older app versions will stop working on {{ $sunset_date }}</li>
        </ul>
    </div>

    <p>As always, thank you for using AFRIData NG. We appreciate your trust in our service!</p>
@endsection
