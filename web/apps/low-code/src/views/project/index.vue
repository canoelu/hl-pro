<template>
    <div class='hl-project-list'>
        <n-grid :x-gap="20" :y-gap="20" cols="2 s:2 m:3 l:4 xl:4 xxl:4" responsive="screen">
            <n-grid-item v-for="(item, index) in list" :key="item.id">
                <card-item :itemData="item" @edit='handleEdit'></card-item>
            </n-grid-item>
        </n-grid>
    </div>
</template>
<script setup lang="ts">
import { useRouterPush } from '@/hooks/common/router';
import CardItem from './components/card-item.vue'
import { ProjectList, ProjectItem } from './type'
const { routerPushByKey } = useRouterPush();

const list = ref<ProjectList>([
    {
        "id": "882417273753702400",
        "projectName": "513ody4hpsk000",
        "state": 1,
        "createTime": "2023-11-09 10:18:03",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": "https://admin.mtruning.club/static/file_upload/556205cc1e7add56a6f9c35ca169bfca.png",
        "remarks": null
    },
    {
        "id": "882418550017495040",
        "projectName": "",
        "state": -1,
        "createTime": "2023-11-09 10:23:07",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": "https://admin.mtruning.club/static/file_upload/8e3409ee18af65b4fe56a4f4dccd1ae6.png",
        "remarks": null
    },
    {
        "id": "882425734516314112",
        "projectName": "2dx8k0fxnf0g00",
        "state": -1,
        "createTime": "2023-11-09 10:51:40",
        "createUserId": "819508604724973568",
        "isDelete": -1,
        "indexImage": "https://admin.mtruning.club/static/file_upload/ae20b95b6c166b1fba2c5dfcf6cc6c94.png",
        "remarks": null
    },
    {
        "id": "882426159529332736",
        "projectName": "33nelqktf0s000",
        "state": 1,
        "createTime": "2023-11-09 10:53:21",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": null,
        "remarks": null
    },
    {
        "id": "882429045617332224",
        "projectName": "44ptmv8gv6o000",
        "state": -1,
        "createTime": "2023-11-09 11:04:49",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": null,
        "remarks": null
    },
    {
        "id": "882429907186094080",
        "projectName": "",
        "state": 1,
        "createTime": "2023-11-09 11:08:15",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": "https://admin.mtruning.club/static/file_upload/4f019e1eb76b29f82fc0a76658d5f652.png",
        "remarks": null
    },
    {
        "id": "882431021067407360",
        "projectName": "5iqvk03uce0000",
        "state": 1,
        "createTime": "2023-11-09 11:12:40",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": null,
        "remarks": null
    },
    {
        "id": "882434385641607168",
        "projectName": "2ogik1dvcqhxxc",
        "state": -1,
        "createTime": "2023-11-09 11:26:03",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": null,
        "remarks": null
    },
    {
        "id": "882435460947906560",
        "projectName": "5uxj15mbm7g000",
        "state": -1,
        "createTime": "2023-11-09 11:30:19",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": null,
        "remarks": null
    },
    {
        "id": "882436246956281856",
        "projectName": "3tq561dqj6e000",
        "state": -1,
        "createTime": "2023-11-09 11:33:26",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": null,
        "remarks": null
    },
    {
        "id": "882436877649580032",
        "projectName": "1uscoj97e04g00",
        "state": -1,
        "createTime": "2023-11-09 11:35:57",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": null,
        "remarks": null
    },
    {
        "id": "882436942908755968",
        "projectName": "4u8jcs64gdu000",
        "state": -1,
        "createTime": "2023-11-09 11:36:12",
        "createUserId": "1",
        "isDelete": -1,
        "indexImage": "https://admin.mtruning.club/static/file_upload/b50b7e0101913a4dc405c1ecf6805003.png",
        "remarks": null
    }
])
const handleEdit = (itemData: ProjectItem) => {
    routerPushByKey('design', { query: { id: itemData.id } })
}

</script>