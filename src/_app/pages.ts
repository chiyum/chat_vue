import { Component } from "vue";

// 定義頁面模組的類型
interface PageModule {
  default: {
    layout?: string;
    title?: string;
    header?: string;
    noScroll?: boolean;
    slidePosition?: string;
    sort?: number;
    hideInput?: boolean;
    handleScroll?: boolean;
    // inSidebar?: boolean; // 後續自動新增sidebar
  };
}

// 定義路由的類型
interface Route {
  path: string;
  name: string;
  meta: {
    layout: string;
    title: string;
    slidePosition: string;
    sort: number;
    hideInput: boolean;
    handleScroll: boolean;
    // inSidebar: boolean;
  };
  component: () => Promise<Component>;
}

// 使用 import.meta.glob 獲取所有的 .vue 文件
const files = import.meta.glob("../pages/**/*.vue");
const defaults = import.meta.glob<PageModule>("../pages/**/*.vue", {
  eager: true
});

const modules: Route[] = [];

for (const path in files) {
  /* 抓取路由 */
  const name = path.replace("../pages", "").toLowerCase().replace(".vue", "");
  let currentPath = name;

  /* /index => / */
  currentPath = currentPath.replace(/\/index$/, "");

  /* /_id => /:id  動態路由 */
  currentPath = currentPath.replace(/\/_+/g, "/:");

  const pageModule = defaults[path];

  /* 上傳路由 */
  modules.push({
    path: currentPath, // 路由
    name: currentPath, // 路由名稱
    meta: {
      layout: pageModule.default.layout || "layout-default", // 頁面 layout
      title: pageModule.default.title || "app.project.title", // 頁面 title
      slidePosition: pageModule.default.slidePosition || "fade", // 頁面動畫
      sort: pageModule.default.sort || -1, // 頁面排序
      hideInput: pageModule.default.hideInput || false, // 頁面排序
      handleScroll: pageModule.default.handleScroll || false // 關閉頁面滑動 用於layout-deafult
    },
    component: files[path] // 頁面 component
  });
}

function sortRoutes(routes: Route[]): Route[] {
  // 保存原始顺序
  const originalOrder = routes.map((route, index) => ({ route, index }));

  // 分离需要排序的路由和不需要排序的路由
  const routesToSort = originalOrder.filter(
    (item) =>
      item.route.meta &&
      item.route.meta.sort !== undefined &&
      item.route.meta.sort !== -1
  );
  const routesNotToSort = originalOrder.filter(
    (item) =>
      !item.route.meta ||
      item.route.meta.sort === undefined ||
      item.route.meta.sort === -1
  );

  // 对需要排序的路由进行排序
  routesToSort.sort((a, b) => a.route.meta.sort - b.route.meta.sort);

  // 合并排序后的路由和不需要排序的路由，保持不排序路由的原始顺序
  const sortedRoutes = [
    ...routesToSort,
    ...routesNotToSort.sort((a, b) => a.index - b.index)
  ];

  // 返回排序后的路由数组，不包含原始索引信息
  return sortedRoutes.map((item) => item.route);
}

export default sortRoutes(modules);
