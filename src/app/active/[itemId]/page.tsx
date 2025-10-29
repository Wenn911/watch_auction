import { getWatch } from "$/api";
import { AppText } from "$/components/AppText";

export default async function ItemPage({
  params,
}: {
  params: { itemId: string };
}) {
  const { itemId } = await params;

  const watch = await getWatch(parseInt(itemId))

  if (!watch) return;

  return (
    <div className="grid gap-16">
      <img src={watch.image} className="w-full h-full max-w-600 rounded-2xl z-1" />
      <div>
        <AppText size="L" variant="medium" text={watch.name} />
      </div>
    </div>
  )
}