<template>
    <div class="lostContainer">
        <div class="rules">
          言论
        </div>
        <lostList :lostsList="losts" />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { FETCH_LOST } from '@/stores/mutation-types'
import lostList from '@/components/lostList'
export default {
  onShow () {
    this.getLosts()
    console.log(this, 'lost')
  },
  computed: {
    ...mapState('losts', {
      losts: state => state.losts
    })
  },
  methods: {
    ...mapActions('losts', {
      getLosts: FETCH_LOST
    })
  },
  components: {
    lostList
  }
}
</script>
<style lang="scss" scoped>
     .rules {
            height: 100px;
            text-align: center;
            line-height: 100px;
        }
</style>