export function createPageUrl(pageName) {
return (
"/" +
pageName
.replace(/([a-z])([A-Z])/g, "$1-$2") // BlogEditor → Blog-Editor
.toLowerCase()
);
}