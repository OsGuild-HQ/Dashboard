import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Terminal, 
  GitPullRequest, 
  MessageSquare, 
  GitCommit, 
  GitMerge
} from "lucide-react";

const INITIAL_ACTIVITY = [
  {
    id: 1,
    repo: "os-guild/ui",
    message: "refactor: simplify dashboard components",
    time: "2h ago",
    type: "commit",
  },
  {
    id: 2,
    repo: "neo-wallet/core",
    message: "feat: add lightning channel management",
    time: "5h ago",
    type: "pr",
  },
  {
    id: 3,
    repo: "architect-bot/engine",
    message: "Approved pull request #42",
    time: "1d ago",
    type: "review",
  },
];

const EXTRA_ACTIVITY = [
  {
    id: 4,
    repo: "fedimint-modules/banking",
    message: "docs: update self-custodial banking guides",
    time: "2d ago",
    type: "commit",
  },
  {
    id: 5,
    repo: "os-guild/core",
    message: "Merged branch 'main' into dev",
    time: "3d ago",
    type: "merge",
  },
  {
    id: 6,
    repo: "neo-wallet/mobile",
    message: "bugfix: fix fedimint login session timeouts",
    time: "4d ago",
    type: "commit",
  },
];

export function ActivitySection() {
  const [activity, setActivity] = useState(INITIAL_ACTIVITY);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    setActivity(prev => [...prev, ...EXTRA_ACTIVITY]);
    setHasMore(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "commit":
        return Terminal;
      case "pr":
        return GitPullRequest;
      case "review":
        return MessageSquare;
      case "merge":
        return GitMerge;
      default:
        return GitCommit;
    }
  };

  return (
    <section className="space-y-8">
      {/* Section Header */}
      <div className="flex items-end justify-between border-b-[3px] border-black pb-4">
        <h2 className="flex items-center gap-3 text-2xl font-black text-white">
          <span className="inline-block h-3.5 w-3.5 border-2 border-black bg-white" />
          Recent Pulse
        </h2>
      </div>

      {/* Activity Timeline Container */}
      <div className="border-[3px] border-black bg-[#0d1117] p-4 md:p-6 shadow-[6px_6px_0px_0px_#000000]">
        <div className="relative border-l-2 border-black/40 pl-6 ml-4 space-y-8 py-2">
          {activity.map((item, i) => {
            const Icon = getIcon(item.type);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
                className="relative group flex items-start gap-4"
              >
                {/* Timeline Dot Indicator */}
                <div className="absolute -left-[35px] mt-1.5 flex h-6 w-6 items-center justify-center border-2 border-black bg-[#161b22] text-white shadow-[2px_2px_0px_0px_#000000] group-hover:bg-[#238636] transition-colors z-10">
                  <Icon className="h-3.5 w-3.5 text-white transition-colors group-hover:text-black" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-mono text-xs text-[#8b949e] mb-0.5">{item.repo}</p>
                  <p className="text-base font-bold text-white leading-snug group-hover:text-[#39d353] transition-colors break-words pr-2">
                    {item.message}
                  </p>
                </div>

                <div className="flex-shrink-0 pt-0.5">
                  <span className="border border-[#30363d] bg-black/50 px-2 py-0.5 font-mono text-[10px] font-bold text-[#8b949e]">
                    {item.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <button
            onClick={handleLoadMore}
            className="mt-6 w-full border-[2px] border-black bg-[#161b22] py-3 font-bold text-[#c9d1d9] transition-all cursor-pointer hover:-translate-y-0.5 hover:bg-[#238636] hover:text-black hover:shadow-[4px_4px_0px_0px_#000000] active:translate-y-0 active:shadow-[1px_1px_0px_0px_#000000]"
          >
            Load more activity
          </button>
        )}
      </div>
    </section>
  );
}
