<template>
  <div class="dashboard">
    <div class="dashboard__inner">
      <div class="model-list">
        <div class="model-list__inner">
          <div
            :ref="modelName"
            class="model"
            v-for="(model, modelName) in models"
            :key="modelName"
          >
            <div @click.stop="toggleModel(modelName)" class="model__header">
              <p class="model__name">{{ modelName }}</p>
              <p v-if="model == null" class="model__load-error">
                Ошибка загрузки
              </p>
              <p v-else class="model__amount">{{ model.length }} записей</p>
              <span class="model__arrow"></span>
            </div>
            <div class="table">
              <div class="table__inner">
                <div class="table__toolbar">
                  <p @click.stop="addItem(modelName)">+</p>
                  <p @click.stop="popItem(modelName)">-</p>
                  <p @click.stop="refreshTable(modelName)">refresh</p>
                  <p @click.stop="saveTable(modelName)">apply</p>
                </div>
                <div class="table__mask table__item">
                  <div class="table__item-wrapper">
                    <p
                      v-for="field in fields[modelName]"
                      :key="field"
                      class="table__field"
                    >
                      {{ field }}
                    </p>
                  </div>
                </div>
                <div
                  class="table__item"
                  v-for="(entry, idx) in created[modelName]"
                  :key="idx"
                >
                  <div class="table__item-wrapper">
                    <span
                      v-for="(value, field) in entry"
                      :key="`${idx}-${field}-${value}`"
                      class="table__field"
                    >
                      <p v-if="field === 'id'">
                        {{ value }}
                      </p>
                      <input
                        v-else
                        @change="
                          changeHandler(
                            modelName,
                            idx,
                            field,
                            $event.target.value,
                            true
                          )
                        "
                        :value="
                          changedValue(modelName, idx, field, value, true)
                        "
                      />
                    </span>
                  </div>
                </div>
                <div
                  class="table__item"
                  v-for="(entry, idx) in models[modelName]"
                  :key="idx"
                >
                  <span
                    v-for="(value, field) in entry"
                    :key="`${idx}-${field}-${value}`"
                  >
                    <p v-if="field === '_id'">{{ value }}</p>
                    <input
                      v-else
                      class="table__field"
                      @change="
                        changeHandler(
                          modelName,
                          idx,
                          field,
                          $event.target.value
                        )
                      "
                      :value="changedValue(modelName, idx, field, value)"
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    this.fields = await this.$axios
      .get('/models')
      .then((res) => res.data)
      .catch((e) => console.warn('Models ERROR:', e))
    if (this.fields == null) return

    const modelNames = Object.keys(this.fields)
    modelNames.every(async (name) => {
      this.created[name] = []
      this.changed[name] = {}
      this.models[name] = await this.$axios
        .get(`models/${name}`)
        .then((res) => res.data)
        .catch((e) => console.warn(e))
    })
  },

  data() {
    return {
      fields: {},
      models: {},
      changed: {},
      created: {},
    }
  },

  methods: {
    toggleModel(modelName) {
      this.$refs[modelName]?.classList.toggle('active')
    },

    changeHandler(modelName, idx, key, value, isNew = false) {
      const store = isNew ? this.created : this.changed

      if (store[modelName][idx] == null) store[modelName][idx] = {}

      store[modelName][idx][key] = value
    },

    changedValue(modelName, idx, key, value, isNew = false) {
      const store = isNew ? this.created : this.changed

      try {
        value = store[modelName][idx][key] || value
      } finally {
        return value
      }
    },

    addItem(modelName) {
      const entry = Object.fromEntries(
        this.fields[modelName].map((field) => [field, ''])
      )
      // const lastInd = this.models[modelName].length - 1
      // entry.id = this.models[modelName][lastInd].id + 1
      // this.models[modelName].unshift(entry)
      this.created[modelName].unshift(entry)
      // this.models.splice(0, 0, )
    },

    popItem(modelName) {},

    async refreshTable(modelName) {
      this.models[modelName] = await this.$axios
        .get(`models/${modelName}`)
        .then(({ data }) => data)
        .catch((e) => console.warn(e))
    },

    async saveTable(modelName) {
      const changedEntries = Object.entries(this.changed[modelName])
      changedEntries.map(([idx, entry]) => {
        const id = this.models[modelName][idx].id
        this.$axios.put(`models/${modelName}/${id}`, entry)
        this.models[modelName][idx] = Object.assign(
          this.models[modelName][idx],
          entry
        )
      })
      this.changed[modelName] = {}

      const createdEntries = Object.entries(this.created[modelName])
      createdEntries.map(([_, entry]) => {
        this.$axios
          .post(`models/${modelName}`, entry)
          .then(({ data }) => this.models[modelName].push(data))
      })
      this.created[modelName] = []
    },
  },
}
</script>

<style lang="scss" scoped>
.model-list {
  padding: 3em;
  width: 100%;
  height: 100%;
}

.model {
  margin: 0 0 25px;
  width: 100%;
  height: 3em;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.16);
  transition: 0.3s ease-in;
  overflow: hidden;

  &.active {
    height: auto;
  }

  &.active &__arrow {
    &::before {
      transform: rotate(-45deg);
    }
    &::after {
      transform: rotate(45deg);
    }
  }

  &__header {
    padding: 0 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    grid-gap: 0 10px;
    width: 100%;
    height: 3em;
  }

  &__name {
    flex: 1 1 auto;
    text-align: left;
  }

  &__amount {
    text-align: right;
  }

  &__arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1em;
    height: 1em;
    transition: 0.3s ease-out;

    // &.active {
    //   transform: rotate(180deg);
    // }

    &::before,
    &::after {
      content: '';
      margin: -2px;
      width: 70%;
      height: 1px;
      background-color: #212121;
      transform: rotate(45deg);
      transition: 0.3s ease;
    }
    &::after {
      transform: rotate(-45deg);
    }
  }
}

.table {
  padding: 3em;
  width: 100%;
  height: 100%;

  &__inner {
    width: 100%;
    height: 100%;
    border-radius: 7px;
    border: 1px solid #212121;
    overflow-y: auto;
  }

  &__toolbar {
    padding: 10px 15px;
    position: sticky;
    left: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    grid-gap: 0 20px;
  }

  &__mask {
    position: sticky;
    top: 0;
    box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.16);
  }

  &__item {
    padding: 7px 15px;
    width: 100%;

    &-wrapper {
      display: flex;
      justify-content: space-between;
      grid-gap: 0 20px;
      width: auto;
    }
  }

  &__item:nth-child(even) {
    background-color: #ededed;
  }

  &__field {
    flex: 0 0 150px;

    input {
      width: 100%;
      border: 1px solid #f1f2f6;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0.16);
    }
  }
}
</style>