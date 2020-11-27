<template>
  <div class="container">
    <div class="header">
      <a-row type="flex" align="middle">
        <a-col :span="19">
          <img src="./splitview.png" alt="logo" style="width:180px;" />
        </a-col>
        <a-col :span="5" style="text-right;">
          <a-switch v-model="open" />
        </a-col>
      </a-row>
    </div>

    <a-divider />

    <div class="content">
      <a-row :gutter="[16, 16]">
        <a-col v-for="mode in modes" :key="mode.type" :span="6">
          <div
            :class="[mode.ele.name, { active: active === mode.type }, { hover: hover === mode.type }]"
            @click="active = mode.type"
            @mouseover="hover = mode.type"
            @mouseout="hover = ''"
          >
            <div
              v-for="(node, index) in mode.ele.nodes"
              :key="index"
              :class="[node.name, { active: active === mode.type && subActive === node.block }, { hover: hover === mode.type && subHover === node.block }]"
              @click="node.block && (subActive = node.block)"
              @mouseover="node.block && (subHover = node.block)"
              @mouseout="node.block && (subHover = '')"
            >
              <template v-if="!node.block">
                <div
                  v-for="(cnode, jndex) in node.nodes"
                  :key="jndex"
                  :class="[cnode.name, { active: active === mode.type && subActive === cnode.block }, { hover: hover === mode.type && subHover === cnode.block }]"
                  @click="subActive = cnode.block"
                  @mouseover="subHover = cnode.block"
                  @mouseout="subHover = ''"
                ></div>
              </template>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modes: [
        {
          type: 'A|B',
          data: [
            { name: 'A', style: { width: '50%', height: '100%', top: '0%', left: '0%' } },
            { name: 'B', style: { width: '50%', height: '100%', top: '0%', left: '50%' } },
          ],
          ele: {
            name: 'mode_box mode_box--flex',
            nodes: [
              { name: '', block: 'A' },
              { name: 'mode_box--border-left', block: 'B' },
            ],
          },
        },
        {
          type: 'A-B',
          data: [
            { name: 'A', style: { width: '100%', height: '50%', top: '0%', left: '0%' } },
            { name: 'B', style: { width: '100%', height: '50%', top: '50%', left: '0%' } },
          ],
          ele: {
            name: 'mode_box mode_box--flex-column',
            nodes: [
              { name: '', block: 'A' },
              { name: 'mode_box--border-top', block: 'B' },
            ],
          },
        },
        {
          type: 'A|B|C',
          data: [
            { name: 'A', style: { width: '33.33%', height: '100%', top: '0%', left: '0%' } },
            { name: 'B', style: { width: '33.33%', height: '100%', top: '0%', left: '33.33%' } },
            { name: 'C', style: { width: '33.33%', height: '100%', top: '0%', left: '66.66%' } },
          ],
          ele: {
            name: 'mode_box mode_box--flex',
            nodes: [
              { name: '', block: 'A' },
              { name: 'mode_box--border-left', block: 'B' },
              { name: 'mode_box--border-left', block: 'C' },
            ],
          },
        },
        {
          type: 'A-B-C',
          data: [
            { name: 'A', style: { width: '100%', height: '33.33%', top: '0%', left: '0%' } },
            { name: 'B', style: { width: '100%', height: '33.33%', top: '33.33%', left: '0%' } },
            { name: 'C', style: { width: '100%', height: '33.33%', top: '66.66%', left: '0%' } },
          ],
          ele: {
            name: 'mode_box mode_box--flex-column',
            nodes: [
              { name: '', block: 'A' },
              { name: 'mode_box--border-top', block: 'B' },
              { name: 'mode_box--border-top', block: 'C' },
            ],
          },
        },
        {
          type: '[A-B]|C',
          data: [
            { name: 'A', style: { width: '50%', height: '50%', top: '0%', left: '0%' } },
            { name: 'B', style: { width: '50%', height: '50%', top: '50%', left: '0%' } },
            { name: 'C', style: { width: '50%', height: '100%', top: '0%', left: '50%' } },
          ],
          ele: {
            name: 'mode_box mode_box--flex',
            nodes: [
              {
                name: 'mode_box--flex-column',
                nodes: [
                  { name: '', block: 'A' },
                  { name: 'mode_box--border-top', block: 'B' },
                ],
              },
              { name: 'mode_box--border-left', block: 'C' },
            ],
          },
        },
        {
          type: 'A|[B-C]',
          data: [
            { name: 'A', style: { width: '50%', height: '100%', top: '0%', left: '0%' } },
            { name: 'B', style: { width: '50%', height: '50%', top: '0%', left: '50%' } },
            { name: 'C', style: { width: '50%', height: '50%', top: '50%', left: '50%' } },
          ],
          ele: {
            name: 'mode_box mode_box--flex',
            nodes: [
              { name: '', block: 'A' },
              {
                name: 'mode_box--flex-column mode_box--border-left',
                nodes: [
                  { name: '', block: 'B' },
                  { name: 'mode_box--border-top', block: 'C' },
                ],
              },
            ],
          },
        },
        {
          type: '[A|B]-C',
          data: [
            { name: 'A', style: { width: '50%', height: '50%', top: '0%', left: '0%' } },
            { name: 'B', style: { width: '50%', height: '50%', top: '0%', left: '50%' } },
            { name: 'C', style: { width: '100%', height: '50%', top: '50%', left: '0%' } },
          ],
          ele: {
            name: 'mode_box mode_box--flex-column',
            nodes: [
              {
                name: 'mode_box--flex',
                nodes: [
                  { name: '', block: 'A' },
                  { name: 'mode_box--border-left', block: 'B' },
                ],
              },
              { name: 'mode_box--border-top', block: 'C' },
            ],
          },
        },
        {
          type: 'A-[B|C]',
          data: [
            { name: 'A', style: { width: '100%', height: '50%', top: '0%', left: '0%' } },
            { name: 'B', style: { width: '50%', height: '50%', top: '50%', left: '0%' } },
            { name: 'C', style: { width: '50%', height: '50%', top: '50%', left: '50%' } },
          ],
          ele: {
            name: 'mode_box mode_box--flex-column',
            nodes: [
              { name: '', block: 'A' },
              {
                name: 'mode_box--flex mode_box--border-top',
                nodes: [
                  { name: '', block: 'B' },
                  { name: 'mode_box--border-left', block: 'C' },
                ],
              },
            ],
          },
        },
      ],
      initOpen: false,
      initActive: false,
      open: false,
      active: '',
      hover: '',
      subActive: '',
      subHover: '',
      commonStyle: {
        position: 'fixed',
        zIndex: '9',
        border: '1px solid #d9d9d9',
        boxSizing: 'border-box',
      },
      background: chrome.extension.getBackgroundPage().background,
      statusMap: {
        true: { text: chrome.i18n.getMessage('badgeOpen'), color: [24, 144, 255, 255], handleOpenTabs: 'addOpenTab' },
        false: { text: '', color: [0, 0, 0, 0], handleOpenTabs: 'deleteOpenTab' },
      },
    };
  },
  computed: {
    statusKey() {
      return this.open + '-' + this.active + '-' + this.subActive;
    },
  },
  watch: {
    statusKey() {
      if (!this.initOpen && !this.initActive) {
        if (this.open) {
          const data = this.getModeData();
          if (data) {
            this.closeSplit();
            this.openSplit(data);
          }
        } else {
          this.closeSplit();
        }

        this.setStorage();
      }
    },
    open(value) {
      if (!this.initOpen) {
        chrome.browserAction.setBadgeText({ text: this.statusMap[value].text });
        chrome.browserAction.setBadgeBackgroundColor({ color: this.statusMap[value].color });

        this.getCurrentTabId(tabId => {
          const handler = this.statusMap[value].handleOpenTabs;
          this.background[handler](tabId);
        });
      }
    },
  },
  created() {
    this.setActive(); // 默认激活项保存在storage.sync中，页面特有的激活项保存在background中，后者的配置会覆盖前者
    this.setOpenStatus(); // 每个页面的开关状态保存在background中
  },
  methods: {
    // 开启分屏
    openSplit(data) {
      this.sendMessageToContentScript(
        {
          cmd: 'open',
          data: data,
        },
        response => {
          if (response === 1) {
            console.log('open');
          }
        }
      );
    },
    // 关闭分屏
    closeSplit() {
      this.sendMessageToContentScript({ cmd: 'close' }, response => {
        if (response === 1) {
          console.log('close');
        }
      });
    },
    // 获取分屏数据
    getModeData() {
      const mode = this.getActiveMode();
      if (mode instanceof Object && mode.data instanceof Object) {
        mode.data.forEach(block => {
          Object.assign(block.style, this.commonStyle);
        });

        return {
          main: this.getMainData(mode.data),
          blocks: this.getBlocksData(mode.data),
        };
      }

      return null;
    },
    // 获取选中的模式
    getActiveMode() {
      return this.modes.find(mode => mode.type === this.active);
    },
    // 获取主屏幕数据
    getMainData(data) {
      return data.find(block => block.name === this.subActive);
    },
    // 获取分屏幕数据
    getBlocksData(data) {
      return data.filter(block => block.name !== this.subActive);
    },
    // 本地储存激活项
    setStorage() {
      // 保存在background中
      this.getCurrentTabId(tabId => {
        this.background.setTabData(tabId, {
          active: this.active,
          subActive: this.subActive,
        });
      });

      // 保存在storage.sync中
      chrome.storage.sync.set({
        SplitViewStorage: {
          active: this.active,
          subActive: this.subActive,
        },
      });
    },
    // 从本地储存中获取激活项
    setActive() {
      this.initActive = true;
      this.getCurrentTabId(tabId => {
        // 1、从background中获取
        const active = this.background.getTabData(tabId).active;
        const subActive = this.background.getTabData(tabId).subActive;
        if (active && subActive) {
          [this.active, this.subActive] = [active, subActive];
          this.$nextTick(() => {
            this.initActive = false;
          });
        } else {
          // 2、从storage.sync中获取
          chrome.storage.sync.get('SplitViewStorage', result => {
            if (result.SplitViewStorage instanceof Object) {
              [this.active, this.subActive] = [result.SplitViewStorage.active, result.SplitViewStorage.subActive];
            }
            this.$nextTick(() => {
              this.initActive = false;
            });
          });
        }
      });
    },
    // 设置开关状态
    setOpenStatus() {
      this.initOpen = true;
      this.getCurrentTabId(tabId => {
        const openTabs = this.background.getOpenTabs();
        this.open = openTabs.includes(tabId);
        this.$nextTick(() => {
          this.initOpen = false;
        });
      });
    },
    // 向content-script主动发送消息
    sendMessageToContentScript(message, callback) {
      this.getCurrentTabId(tabId => {
        chrome.tabs.sendMessage(tabId, message, response => {
          if (callback) callback(response);
        });
      });
    },
    // 获取当前选项卡ID
    getCurrentTabId(callback) {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        if (callback) callback(tabs.length ? tabs[0].id : null);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 280px;
}
.header,
.content {
  padding: 16px;
}
.mode_box {
  width: 50px;
  height: 50px;
  outline: #d9d9d9 solid 1px;
  border: none;
  cursor: pointer;
  overflow: hidden;
}
.mode_box.hover,
.mode_box.hover div {
  outline-color: #91d5ff;
}
.mode_box div.hover {
  background-color: #e6f7ff;
}
.mode_box.active,
.mode_box.active div {
  outline-color: #1890ff;
}
.mode_box div.active {
  background-color: #1890ff;
}
.mode_box--border-left {
  border-left: 1px solid #d9d9d9;
}
.mode_box--border-top {
  border-top: 1px solid #d9d9d9;
}
.mode_box--flex {
  display: flex;
}
.mode_box--flex-column {
  display: flex;
  flex-direction: column;
}
.mode_box--flex > div,
.mode_box--flex-column > div {
  flex: 1;
}
.ant-divider {
  margin: 0;
}
</style>
