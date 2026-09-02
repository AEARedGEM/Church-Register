<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $campaign->subject }}</title>
</head>
<body style="margin:0;background:#f5efe9;color:#1e293b;font-family:Arial,sans-serif;line-height:1.6;padding:24px 0;">
    <main style="max-width:640px;margin:0 auto;background:#fff;border-top:6px solid #8d1126;padding:36px;">
        <p style="color:#8d1126;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">APGA Worldwide</p>
        <h1 style="color:#1e293b;font-size:28px;margin:18px 0;">{{ $campaign->subject }}</h1>
        <div style="white-space:pre-line;font-size:16px;">{{ $campaign->body }}</div>
        <p style="margin-top:36px;font-size:12px;color:#64748b;">You are receiving this because you subscribed to church updates.</p>
        <a href="{{ $unsubscribeUrl }}" style="font-size:12px;color:#8d1126;">Unsubscribe from church newsletters</a>
    </main>
</body>
</html>
