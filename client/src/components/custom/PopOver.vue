<template>
    <div class="pop_over_container">
        <component :is="childrens">{{ childrens() }}</component>
    </div>
</template>

<script>
import { cloneVNode } from "vue";
export default {
    data() {
        return {
            anchorEl: null,
        };
    },
    props: {
        getisopen: {
            default: () => {},
        },
    },
    methods: {
        childrens() {
            const childs = [];
            this.$slots.default().forEach((child) => {
                if (child.type?.displayName === "PopItem") {
                    childs.push(
                        cloneVNode(child, {
                            isOpen: Boolean(this.anchorEl),
                            setOpen: this.resetAnchorEl,
                            anchorEl: this.anchorEl,
                        })
                    );
                } else {
                    childs.push(
                        cloneVNode(child, {
                            isOpen: Boolean(this.anchorEl),
                            onClick: this.setAnchorEl,
                        })
                    );
                }
            });
            return childs;
        },

        setAnchorEl(event) {
            this.anchorEl = event.currentTarget;
        },
        resetAnchorEl() {
            this.anchorEl = null;
        },
    },

    watch: {
        anchorEl() {
            if (this.getisopen) {
                this.getisopen(Boolean(this.anchorEl));
            }
        },
    },
};
</script>
