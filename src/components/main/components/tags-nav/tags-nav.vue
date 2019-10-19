<style lang="less">
@import "./tags-nav.less";
</style>

<template>
    <div class="tags-nav">
        <div class="close-con">
            <Dropdown transfer @on-click="handleTagsOption" style="margin-top: 6px;">
                <Button size="small" type="text">
                    <Icon :size="18" type="ios-close-circle-outline" />
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem name="close-all">关闭所有</DropdownItem>
                    <DropdownItem name="close-others">关闭其他</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <ul v-show="visible" :style="{left: contextMenuLeft + 'px', top: contextMenuTop + 'px'}" class="contextmenu">
            <li v-for="(item, key) of menuList" :key="key">{{item}}</li>
        </ul>
        <div class="btn-con left-btn">
            <Button type="text" @click="handleScroll(240)">
                <Icon :size="18" type="ios-arrow-back" />
            </Button>
        </div>
        <div class="btn-con right-btn">
            <Button type="text" @click="handleScroll(-240)">
                <Icon :size="18" type="ios-arrow-forward" />
            </Button>
        </div>
        <div ref="scrollOuter" class="scroll-outer">
            <div ref="scrollBody" class="scroll-body" >
                <transition-group name="taglist-moving-animation">
                    <!--$config.homeName-->
                    <Tag
                        ref="tagsPageOpened"
                        type="dot"
                        tabindex="-1"
                        style="outline: none"
                        v-for="(item, index) in list"
                        :key="`tag-nav-${index}`"
                        :name="item.name"
                        :data-route-item="item"
                        :closable="item.name !== 'home'"
                        :color="isCurrentTag(item) ? 'primary' : 'default'"
                        @on-close="handleClose(item)"
                        @click.native="handleClick(item)"
                        @contextmenu.prevent.native="contextMenu(item, $event)"
                        @blur.native="closeMenu">
                        {{item.name}}
                    </Tag>
                </transition-group>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "tags-nav",
        props: {
            list: {
                type: Array,
                default: () => []
            }
        },
        components: {},
        data() {
            return {
                contextMenuLeft: 0,
                contextMenuTop: 0,
                visible: false,
                menuList: {
                    others: '关闭其他',
                    all: '关闭所有'
                }
            };
        },
        computed: {},
        methods: {

            handleScroll(offset) {

            },

            handleTagsOption(type) {

            },

            isCurrentTag() {
                return ''
            },

            handleClose(item) {
                console.log(item)
            },
            handleClick(item) {
                console.log(item)
                this.visible = false;
            },
            contextMenu(item, event) {
                this.visible = true;
                const offsetLeft = this.$el.getBoundingClientRect().left;
                const offsetRight = this.$el.getBoundingClientRect().right;

                if (offsetRight - event.clientX < 90) {
                    this.contextMenuTop = event.clientY - 48;
                    this.contextMenuLeft = offsetRight - offsetLeft - 80
                } else {
                    this.contextMenuLeft = event.clientX - offsetLeft + 10;
                    this.contextMenuTop = event.clientY - 64;
                }
            },
            closeMenu() {
                this.visible = false;
            }
        },
        watch: {
            // visible (value) {
            //     if (value) {
            //        document.body.addEventListener('click', this.closeMenu)
            //     } else {
            //         document.body.removeEventListener('click', this.closeMenu)
            //     }
            // }
        }
    }
</script>