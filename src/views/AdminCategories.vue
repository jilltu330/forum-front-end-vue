<template>
  <div class="container py-5">
     <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
            v-model="newCategoryName"
          >
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="createCategory"
          >
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th
            scope="col"
            width="60"
          >
            #
          </th>
          <th scope="col">
            Category Name
          </th>
          <th
            scope="col"
            width="210"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="category in categories"
          :key="category.id"
        >
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
          <div
            v-show="!category.isEditing"
            class="category-name"
          >
            {{ category.name }}
          </div>
          <input
            v-show="category.isEditing"
            v-model="category.name"
            type="text"
            class="form-control"
          >
          <span
            v-show="category.isEditing"
            class="cancel"
            @click.stop.prevent="handleCancel(category.id)"
          >
            ✕
          </span>
        </td>
        <td class="d-flex justify-content-between">
          <button
            v-show="!category.isEditing"
            type="button"
            class="btn btn-link mr-2"
            @click.stop.prevent="toggleIsEditing(category.id)"
          >
            Edit
          </button>
          <button
            v-show="category.isEditing"
            type="button"
            class="btn btn-link mr-2"
            @click.stop.prevent="updateCategory({ categoryId: category.id, name: category.name })"
          >
            Save
          </button>
          <button
            type="button"
            class="btn btn-link mr-2"
            @click.stop.prevent="deleteCategory(category.id)"
          >
            Delete
          </button>
        </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import AdminNav from '@/components/AdminNav'
import {v4 as uuidv4} from 'uuid'

//  2. 定義暫時使用的資料
const dummyData = {
  categories: [
    {
      id: 1,
      name: '中式料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 2,
      name: '日本料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 3,
      name: '義大利料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    },
    {
      id: 4,
      name: '墨西哥料理',
      createdAt: '2019-06-22T09:00:43.000Z',
      updatedAt: '2019-06-22T09:00:43.000Z'
    }
  ]
}

export default {
  components: {
    AdminNav
  },
  // 3. 定義 Vue 中使用的 data 資料
  data () {
    return {
      categories: [],
      newCategoryName: '',

    }
  },
  // 5. 調用 `fetchCategories` 方法
  created () {
    this.fetchCategories()
  },
  methods: {
    // 4. 定義 `fetchCategories` 方法，把 `dummyData` 帶入 Vue 物件
    fetchCategories () {
      //無法更動後端api，所以在fetch資料時將isEditing補進來map方式
      this.categories = dummyData.categories.map(category => {
        //回傳一份物件
        return {
          ...category, //結構賦值將原本資料帶進來
          isEditing: false, //在加入新的資料
          nameCached: '', //保留使用者編輯前的名稱
        }
      })
    },
    createCategory() {
      //TODO: 透過API向後端伺服器新增餐廳類別
      this.categories.push({
        id: uuidv4(),
        name: this.newCategoryName,
      })

      this.newCategoryName = ''   // 清空原本欄位中的內容
    },
    deleteCategory(categoryId) {
      //TODO: 透過API向後端伺服器刪除餐廳類別
      this.categories = this.categories.filter(category => category.id !== categoryId)
    },
    updateCategory( { categoryId, name } ) {
      //TODO: 透過API向後端伺服器更新餐廳名稱
      this.toggleIsEditing(categoryId)
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map( category => {
        //如果傳進來的ID是使用者要求變更，請改掉isediting裝態
        if(category.id === categoryId) {
          return {
            ...category, //結構賦值將原本資料帶進來
            isEditing:!category.isEditing,//切換狀態
            nameCached: category.name
          } 
        }

        //如果不是依樣，就return原本的東西
        return category
      }) 
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map( category => {
        if(category.id === categoryId) {
          return {
            ...category,
            //當使用者按下取消，把原本的餐廳名稱還回去
            name: category.nameCached
          }
        } 

        //若取消的不是對應ID或者沒有按取消,將原本資料還回
        return category
      })
      //完成後要切斷狀態
      this.toggleIsEditing(categoryId)

    }
  }
}
</script>

<style scoped>
/* scope = 只會在這個vue檔案作用 */
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>
