export const openWindow = (url:string) => {
  let strWindowFeatures = `width=1440,height=1024,left=999999px,top=999999px`;
  const unionUrl = location.origin + url;
  const infoWindow = window.open(unionUrl, 'union', strWindowFeatures);
  return infoWindow
  // 弹窗被关闭时，引用的变量置为null
  // if (infoWindow) {
  //   infoWindow.onload = () => {
  //     if (infoWindow) {
  //       infoWindow.onunload = () => {
  //         // infoWindow = null;
  //       };
  //     }
  //   };
  //   infoWindow.addEventListener('data', () => {
  //     // @ts-ignore
  //     // const data = infoWindow.__data__;
  //     // const linkParamList = data?.linkParamList || [];
  //     // (topology.value?.linkList || []).map((l) => {
  //     //   const link = linkParamList.find((lp) => lp.object === l.object);
  //     //   if (link) {
  //     //     console.log(link, 'link');
  //     //     return link;
  //     //   }
  //     //   return l;
  //     // });
  //     // if (topology.value) {
  //     //   topology.value = { ...topology.value };
  //     // }
  //   });
  // }
}