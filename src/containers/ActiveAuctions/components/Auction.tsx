import Image from "next/image";
import Link from "next/link";

import { AppText } from "$/components/AppText";
import type { Watch } from "$/db/schema";

export const ActiveAuction = ({ auction }: { auction: Watch }) => {
  const { id, name, price, startTime, image } = auction;

  return (
    <Link href={`/active/${id}`}>
      <div
        className="flex gap-12 bg-[rgba(87,92,112,0.3)] p-12 
        rounded-lg relative overflow-hidden before:content-[''] before:absolute
        before:w-200 before:h-200 before:top-[-110px] before:left-169
        before:bg-[radial-gradient(66.32%_66.32%_at_50%_50%,var(--primary)_0%,rgba(0,0,0,0)_100%)]
        before:rounded-full before:blur-[76px]"
      >
        {image ? 
            <Image src={image} width="160" height="160" className="rounded-2xl z-1" alt="img" /> 
          : 
            <div className="w-160 h-160 rounded-2xl bg-[rgba(87,92,112,0.5)] z-1" />}
        <div className="grid gap-8 z-1">
          <AppText
            size="L"
            variant="semibold"
            text={name}
          />
          <div className="flex justify-between gap-8">
            <div className="grid content-center justify-items-center">
              <AppText
                size="S"
                variant="medium"
                text="Стартовая цена"
              />
              <AppText
                size="S"
                variant="medium"
                text={price}
              />
            </div>
            <div className="grid content-center justify-items-center">
              <AppText
                size="S"
                variant="medium"
                text="До начала аукциона"
              />
              <AppText
                size="S"
                variant="medium"
                text={startTime}
              />
            </div>
          </div>
        </div>
      </div> 
    </Link>
  )
}