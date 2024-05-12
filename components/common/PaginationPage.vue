<template>
  <div class="pagination">
    <p class="page-info">
      Showing {{ fromIndex }} to {{ toIndex }} of {{ totalCount }} entries
    </p>
    <div class="paginator">
      <span
        :class="{ disabled: currentPage === 1, active: true }"
        @click="goPreviousPage"
      >
        <font-awesome-icon icon="fa-solid fa-angle-left"></font-awesome-icon>
      </span>
      <template v-if="totalPages < 6">
        <span
          v-for="(page, index) in Array(totalPages).fill(0)"
          :key="`page-${index}`"
          :class="{ active: currentPage === index + 1 }"
          @click="goPage(index + 1)"
        >
          {{ index + 1 }}
        </span>
      </template>
      <template v-else-if="currentPage < 3 || currentPage > totalPages - 2">
        <span :class="{ active: currentPage === 1 }" @click="goPage(1)">1</span>
        <span :class="{ active: currentPage === 2 }" @click="goPage(2)">2</span>
        <span @click="goPage(3)">
          <font-awesome-icon icon="fa-solid fa-ellipsis"></font-awesome-icon>
        </span>
        <span
          :class="{ active: currentPage === totalPages - 1 }"
          @click="goPage(totalPages - 1)"
          >{{ totalPages - 1 }}</span
        >
        <span
          :class="{ active: currentPage === totalPages }"
          @click="goPage(totalPages)"
          >{{ totalPages }}</span
        >
      </template>
      <template v-else>
        <span @click="goPage(1)">1</span>
        <span @click="goPage(currentPage - 1)">
          <font-awesome-icon icon="fa-solid fa-ellipsis"></font-awesome-icon>
        </span>
        <span class="active">{{ currentPage }}</span>
        <span @click="goNextPage">{{ currentPage + 1 }}</span>
        <span @click="goPage(currentPage + 2)">
          <font-awesome-icon icon="fa-solid fa-ellipsis"></font-awesome-icon>
        </span>
        <span @click="goPage(totalPages)">{{ totalPages }}</span>
      </template>
      <span
        :class="{ disabled: currentPage === totalPages, active: true }"
        @click="goNextPage"
      >
        <font-awesome-icon icon="fa-solid fa-angle-right"></font-awesome-icon>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationPage",
  props: {
    fromIndex: Number,
    toIndex: Number,
    totalCount: Number,
    totalPages: Number,
    currentPage: [String, Number],
  },
  methods: {
    goPreviousPage() {
      this.$emit("goPage", this.currentPage - 1);
    },
    goNextPage() {
      this.$emit("goPage", this.currentPage + 1);
    },
    goPage(page) {
      this.$emit("goPage", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p.page-info {
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 13px;
    color: #000;
  }
  .paginator {
    display: flex;
    align-items: center;
    gap: 0px;
    span {
      user-select: none;
      color: #000;
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      width: 23px;
      height: 23px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-style: normal;
      font-weight: 700;
      font-size: 10.5px;
      line-height: 15px;
      cursor: pointer;
      margin-right: 8px;
      &.active {
        border: 1px solid #fa8c28;
        color: #fa8c28;
        &.disabled {
          background: #eeeeee;
          color: #000;
          border: none;
          pointer-events: none;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    display: block;
    p.page-info {
      margin-top: 16px;
      text-align: center;
    }
    .paginator {
      width: fit-content;
      margin: 12px auto 0;
    }
  }
}
</style>
