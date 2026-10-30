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
          text: 'Official University',
          bg: 'bg-[#080D18] shadow-[inset_1px_1px_3px_#04060B] border-emerald-500/30 text-emerald-300',
          dot: 'bg-emerald-400 shadow-[0_0_6px_#10B981]',
          tooltip: 'Verified and authorized by Aurelia University Administration.'
        };
      case 'Verified Perseus Team Update':
        return {
          icon: Award,
          text: 'Verified Perseus',
          bg: 'bg-[#080D18] shadow-[inset_1px_1px_3px_#04060B] border-cyan-500/30 text-cyan-300',
          dot: 'bg-cyan-400 shadow-[0_0_6px_#38BDF8]',
          tooltip: 'Published by the student Perseus core engineering board.'
        };
      case 'Club Announcement':
        return {
          icon: Users,
          text: 'Club Announcement',
          bg: 'bg-[#080D18] shadow-[inset_1px_1px_3px_#04060B] border-indigo-500/30 text-indigo-300',
          dot: 'bg-indigo-400 shadow-[0_0_6px_#818CF8]',
          tooltip: 'Issued by an officially registered Aurelia campus club or society.'
        };
      case 'Sponsored / Promoted':
        return {
          icon: Sparkles,
          text: 'Sponsored',
          bg: 'bg-[#080D18] shadow-[inset_1px_1px_3px_#04060B] border-amber-500/35 text-amber-300',
          dot: 'bg-amber-400 shadow-[0_0_6px_#FBBF24]',
          tooltip: 'Promoted partnership or sponsored hackathon initiative.'
        };
      case 'Student Submitted':
      default:
        return {
          icon: User,
          text: 'Student Submitted',
          bg: 'bg-[#080D18] shadow-[inset_1px_1px_3px_#04060B] border-purple-500/25 text-purple-300',
          dot: 'bg-purple-400 shadow-[0_0_6px_#C084FC]',
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
        isSmall ? 'px-2.5 py-0.5 text-[11px] font-medium' : 'px-3 py-1 text-xs font-medium'
      }`}
      title={config.tooltip}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.text}</span>
      {showDetails && <span className="opacity-50 text-[10px] ml-0.5 font-mono">Demo</span>}
    </div>
  );
};
