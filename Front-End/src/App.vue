<template>
  <q-layout>
    <div class="row justify-center q-mb-xl">
      <img style="width: 350px" src="@/assets/logo.jpg" />
    </div>
    <div
      v-if="!(res && res.Caption && res.Caption.length > 1)"
      class="row justify-center"
    >
      <div class="col-12 text-center q-my-sm">
        <Button
          style="width: 200px"
          color="purple"
          label="Take a photo"
          @click="fileRef.pickFiles()"
        />
      </div>
      <div class="col-12 text-center q-my-sm">
        <Button
          style="width: 200px"
          color="purple"
          label="Upload Image"
          @click="fileUploadRef.click()"
        />
      </div>
      <div class="col-12">
        <q-file
          class="hidden"
          accept="image/*"
          capture="camera"
          type="file"
          ref="fileRef"
          v-model="newFile"
          label="Pick one file"
          filled
          style="max-width: 300px"
        />
      </div>
      <div class="col-12 hidden">
        <input @change="changePicture" type="file" ref="fileUploadRef" />
      </div>
    </div>
    <div v-else>
      <h5 class="q-my-sm text-center">{{ res.Caption }}</h5>
    </div>
  </q-layout>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import ApiService from "./services/apiService";

const res = ref({
  Caption: "",
});
const isLoading = ref(false);
const newFile = ref();
const fileRef = ref();
const fileUploadRef = ref();

const onClick = () => {
  const msg = new SpeechSynthesisUtterance();
  msg.text = res.value.Caption;
  window.speechSynthesis.speak(msg);
};

const uploadImage = async () => {
  isLoading.value = true;
  const formdata = new FormData();
  formdata.append("file", newFile.value);
  res.value = await ApiService.post("", formdata);
  isLoading.value = true;
  onClick();
  setTimeout(() => {
    res.value.Caption = "";
    newFile.value = null;
  }, 5000);
};

watch(
  () => newFile.value,
  () => {
    if (newFile.value) {
      uploadImage();
    }
  }
);

const changePicture = (e: any) => {
  if (e.target.file) {
    newFile.value = e.target.file;
  } else {
    newFile.value = e.target.files[0];
  }
};

onMounted(() => {
  res.value.Caption = "";
});
</script>

<style lang="scss">
@font-face {
  font-family: "Poppins-rg";
  src: url("./assets/fonts/Poppins-Regular.ttf");
}

body {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span {
    font-family: "Poppins-rg";
  }
  font-family: "Poppins-rg" !important;
}
.screen-center {
  max-width: 1200px;
  margin: auto;
}
.brdr {
  border: 1px solid #e6e7e9 !important;
  &-br {
    border: 1px solid #e6e7e9 !important;
    border-radius: 8px !important;
  }
  &-dashed {
    border: 1px dashed #9e9e9e !important;
    border-radius: 1% !important;
  }
}
</style>
