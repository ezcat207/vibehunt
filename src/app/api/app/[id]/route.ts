import { NextRequest, NextResponse } from 'next/server';
import { getAppById, getAppHistory } from '@/lib/data-loader';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const app = getAppById(params.id);

  if (!app) {
    return NextResponse.json({ error: 'App not found' }, { status: 404 });
  }

  const history = getAppHistory(app.domain).sort((a, b) => a.timestamp - b.timestamp);

  return NextResponse.json({ app, history });
}
