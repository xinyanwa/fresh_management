<template>
  <div className="tree-container">
    <el-tree className="tree" :data="data" :props="defaultProps" accordion @node-click="handleClick"/>
  </div>
</template>

<style lang="less" scoped>

.tree-container {
  padding: 16px;
}

.tree {
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  max-width: 800px;

  &__node {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 24px;

    &:hover {
    }

    &--expand {
      .el-tree-node__icon {
        transform: rotate(90deg);
      }
    }

    &__label {
      font-size: 16px;
      margin-left: 8px;
    }
  }

  &__children {
    padding-left: 8px;

    &__node {
      padding-right: 0;

    }
  }
}
</style>

<script>
export default {
  data() {
    return {
      data: [
        {
          label: "节点1",
          children: [
            {
              label: "节点1-1",
              children: [
                {
                  label: "节点1-2",
                },
              ],
            },
          ],
        },
        {
          label: "节点2",
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  methods: {
    handleClick(node) {
      node.expanded = !node.expanded;
    },
  },
};
</script>
