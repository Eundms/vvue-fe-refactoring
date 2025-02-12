import { NextResponse } from 'next/server';

interface Cookies {
  'CloudFront-Policy'?: string;
  'CloudFront-Signature'?: string;
  'CloudFront-Key-Pair-Id'?: string;
  [key: string]: string | undefined; 
}
export async function GET(req: Request) {
  const url = new URL(req.url);
  const imageUrl = `${url.searchParams.get('url')}`;

  // 쿠키 헤더를 가져옴
  const cookiesHeader = req.headers.get('cookie');
  if (!cookiesHeader) {
    return NextResponse.json({ error: 'No cookies found' }, { status: 400 });
  }

  // 쿠키 파싱
  const cookies = parseCookies(cookiesHeader);
  console.log('Received cookies:', cookies);

  // 쿠키 값이 모두 존재하는지 확인
  if (!cookies['CloudFront-Policy'] || !cookies['CloudFront-Signature'] || !cookies['CloudFront-Key-Pair-Id']) {
    return NextResponse.json({ error: 'Missing required cookies' }, { status: 400 });
  }

  // 쿠키를 명시적으로 헤더에 추가
  const cookieHeader = `CloudFront-Policy=${cookies['CloudFront-Policy']}; CloudFront-Signature=${cookies['CloudFront-Signature']}; CloudFront-Key-Pair-Id=${cookies['CloudFront-Key-Pair-Id']}`;

  // 실제 CloudFront에 요청
  const imageResponse = await fetch(imageUrl, {
    method: 'GET',
    headers: {
      'Cookie': cookieHeader,
    },
    credentials: 'include',
  });

  // 이미지 응답이 실패하면 403 상태 반환
  if (!imageResponse.ok) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  // 이미지를 버퍼로 받아서 반환
  const buffer = await imageResponse.arrayBuffer();
  return new NextResponse(Buffer.from(buffer), {
    headers: { 'Content-Type': 'image/jpeg' },
  });
}


function parseCookies(cookieString: string): Cookies {
  const cookies: Cookies = {};
  const cookieArray = cookieString.split('; ');

  cookieArray.forEach(cookie => {
    const [key, value] = cookie.split('=');
    if (key && value) {
      cookies[key] = value;
    }
  });

  return cookies;
}
