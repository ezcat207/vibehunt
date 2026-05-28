import { getAppById, getAppHistory } from '@/lib/data-loader';
import { formatNumber, formatPercentage } from '@/lib/utils';
import { PLATFORM_CONFIGS } from '@/lib/types';
import { getAppAnalysis } from '@/lib/app-analysis';
import { DetailPageClient } from '@/components/app/DetailPageClient';
import type { Metadata } from 'next';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const app = getAppById(params.id);

  if (!app) {
    return {
      title: 'App Not Found - VibeHunt',
    };
  }

  const platformConfig = PLATFORM_CONFIGS[app.platform];
  return {
    title: `${app.name} - VibeHunt`,
    description: `${app.name} ranks #${app.rank} on ${platformConfig.displayName} with ${formatNumber(app.visits)} monthly visits. Growth: ${formatPercentage(app.change)}.`,
  };
}

export default function AppDetailPage({ params }: Props) {
  const app = getAppById(params.id);

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">App Not Found</h1>
          <p className="mt-2 text-gray-600">The app you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const history = getAppHistory(app.domain, app.platform).sort((a, b) => a.timestamp - b.timestamp);
  const analysis = app.rank <= 3 ? getAppAnalysis(app.domain) : null;

  return <DetailPageClient app={app} history={history} analysis={analysis} />;
}
