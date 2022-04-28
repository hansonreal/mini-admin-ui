// 滚动条默认配置（左侧菜单、标签栏、通知、个性化...）
const scrollBarOpstion = {
  rail: {
    opacity: '0',
    background: undefined,
    size: '0'
  },
  bar: {
    background: 'rgba(0,0,0,.5)',
    keepShow: false,
    size: '0',
    minSize: 0
  },
  scrollButton: {
    enable: false,
    background: '#cecece'
  },
  scrollPanel: {
    easing: 'easeOutQuad',
    speed: 800
  },
  vuescroll: {
    wheelScrollDuration: 600,
    wheelDirectionReverse: true
  }
}

export {
  scrollBarOpstion
}