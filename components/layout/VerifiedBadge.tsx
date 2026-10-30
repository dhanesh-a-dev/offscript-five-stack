import React from 'react';
import { VerificationSource } from '@/types';
import { ShieldCheck, Award, Users, User, Sparkles } from 'lucide-react';

interface VerifiedBadgeProps {
  source: VerificationSource;
  size?: 'sm' | 'md';
  showDetails?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ source, size = 'sm', showDetails = false }) => {
  const getBadgeConfig = () => {
    switch (source) {
      case 'Official University Information':
        return {
          icon: ShieldCheck,
          text: 'Official University Info',
          bg: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
          dot: 'bg-emerald-400',
          tooltip: 'Verified and authorized by Aurelia University Administration.'
        };
      case 'Verified Perseus Team Update':
        return {
          icon: Award,
          text: 'Verified Perseus Team',
          bg: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
          dot: 'bg-cyan-400',
          tooltip: 'Published by the student Perseus core engineering board.'
        };
      case 'Club Announcement':
        return {
          icon: Users,
          text: 'Club Announcement',
          bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
          dot: 'bg-indigo-400',
          tooltip: 'Issued by an officially registered Aurelia campus club or society.'
        };
      case 'Sponsored / Promoted':
        return {
          icon: Sparkles,
          text: 'Sponsored / Promoted',
          bg: 'bg-amber-500/15 border-amber-500/40 text-amber-300',
          dot: 'bg-amber-400',
          tooltip: 'Promoted partnership or sponsored hackathon initiative. Demo campaign.'
        };
      case 'Student Submitted':
      default:
        return {
          icon: User,
          text: 'Student Submitted',
          bg: 'bg-purple-500/10 border-purple-500/25 text-purple-300',
          dot: 'bg-purple-400',
          tooltip: 'Crowdsourced peer submission by an Aurelia student.'
        };
    }
  };

  const config = getBadgeConfig();
  const Icon = config.icon;
  const isSmall = size === 'sm';

  return (
    <div 
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${
        isSmall ? 'px-2.5 py-0.5 text-xs font-medium' : 'px-3 py-1 text-sm font-medium'
      }`}
      title={config.tooltip}
    >
      <Icon className={isSmall ? "w-3.5 h-3.5 shrink-0" : "w-4 h-4 shrink-0"} />
      <span>{config.text}</span>
      {showDetails && <span className="opacity-60 text-[10px] ml-1">(Demo Verified)</span>}
    </div>
  );
};

