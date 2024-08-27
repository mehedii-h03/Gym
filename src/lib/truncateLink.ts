const truncateLink = (link: string | undefined, maxLength: number): string => {
  if (!link) return "";
  if (link.length <= maxLength) return link;
  return link.slice(0, maxLength) + "...";
};
export default truncateLink;
