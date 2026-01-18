import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BubblesIcon,
  Eye,
  MessageCircle,
  MoreHorizontal,
  ThumbsUp,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { formatDateToDisplayID } from "@/lib/formatTanggal";
import { sanitizeHtml } from "@/lib/protectDangerouslySetInnerHTML";
import Link from "next/link";

export const WorkflowBuilderCard = ({ kegiatan, className }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const cleanContent = sanitizeHtml(kegiatan?.content);

  // Animation variants for the details section
  const detailVariants = {
    hidden: { opacity: 0, height: 0, marginTop: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: "1rem",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className={cn("w-full max-w-sm cursor-pointer", className)}
    >
      <Card className="overflow-hidden rounded-xl shadow-md transition-shadow duration-300 hover:shadow-xl">
        {/* Card Image */}
        <div className="relative h-36 w-full">
          <Image
            src={kegiatan.image}
            alt={kegiatan.title}
            className="h-full w-full object-cover"
            fill
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
        </div>

        <div className="p-4">
          {/* Always-visible header content */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>{formatDateToDisplayID(kegiatan.date)}</span>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      kegiatan.author === "Admin"
                        ? "bg-green-500"
                        : "bg-red-500",
                    )}
                    aria-label={kegiatan.author}
                  />
                  <span>{kegiatan.author}</span>
                </div>
              </div>
              <Link href={`/kegiatan/${kegiatan.id}`}>
                <h3 className="mt-1 text-lg font-semibold text-card-foreground">
                  {kegiatan.title}
                </h3>
              </Link>
            </div>
            <button
              aria-label="More options"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Animated description and tags section */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                key="details"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={detailVariants}
                className="overflow-hidden"
              >
                <div
                  className="line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: cleanContent }}
                ></div>
                {/* <p className="text-sm text-muted-foreground">
                  {kegiatan.content}
                </p> */}
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="secondary">{kegiatan.kategori}</Badge>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Card Footer */}
        <div className="flex items-center justify-between border-t border-border p-4">
          <div className="flex space-x-2">
            <p className="flex gap-2 text-sm">
              <Eye size={20} />
              {kegiatan?.views || 0}
            </p>
            <p className="flex gap-2 text-sm">
              <ThumbsUp size={18} />
              {kegiatan?._count?.likes}
            </p>
            <p className="flex gap-2 text-sm">
              <MessageCircle size={17} />
              {kegiatan?._count?.comments}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
