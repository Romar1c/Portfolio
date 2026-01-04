import { PillList } from "@/components/PillList";

type ProjectTagsProps = {
  tags?: string[] | string | null;
};

export function ProjectTags({ tags }: ProjectTagsProps) {
  const normalizedTags = Array.isArray(tags)
    ? tags.filter(Boolean)
    : typeof tags === "string"
      ? tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [];

  return (
    <PillList
      items={normalizedTags}
      emptyLabel="Aucun tag renseigné pour le moment."
    />
  );
}
