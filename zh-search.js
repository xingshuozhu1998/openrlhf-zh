// Use overlapping Chinese bigrams with the existing Sphinx search UI and English index.
Documentation.addTranslations({locale: 'zh_CN', plural_expr: 'n === 1 ? 0 : 1', messages: {
  'Search': '搜索', 'Searching': '正在搜索', 'Search Results': '搜索结果',
  'Preparing search...': '正在准备搜索…', 'Searching...': '正在搜索…',
  "Your search did not match any documents. Please make sure that all words are spelled correctly and that you've selected enough categories.":
    '未找到匹配文档，请检查关键词或尝试其他搜索词。',
  'Search finished, found one page matching the search query.':
    ['搜索完成，找到 1 个匹配页面。', '搜索完成，找到 ${resultCount} 个匹配页面。']
}});
// Older Sphinx versions interpolate the count before looking up the translation.
for (let count = 1; count <= 291; count++) {
  Documentation.TRANSLATIONS[`Search finished, found ${count} page(s) matching the search query.`] =
    `搜索完成，找到 ${count} 个匹配页面。`;
}
var splitQuery = query => query
  .split(/[^\p{Letter}\p{Number}_\p{Emoji_Presentation}]+/gu)
  .filter(Boolean)
  .flatMap(part => (part.match(/[\u4e00-\u9fff]+|[^\u4e00-\u9fff]+/g) || []).flatMap(word => {
    if (!/^[\u4e00-\u9fff]+$/.test(word) || word.length < 2) return [word];
    return Array.from({length: word.length - 1}, (_, i) => word.slice(i, i + 2));
  }));
