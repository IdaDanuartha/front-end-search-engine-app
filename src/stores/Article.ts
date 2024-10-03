import {apiURL} from "../../helpers/global_variable";
import type {Article} from "@/types/Article";
import {defineStore} from "pinia";
import router from "@/router";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "./Auth";

export const useArticleStore = defineStore("useArticleStore", {
    state : () => ({
        articles: [] as Article[],
        article: {} as Article,
    }),
    actions : {
        async getAll (query: string = "") {
            try {
                const result = await axios.get(apiURL + `/articles?query=${query}`)
                this.articles = result.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async getByID (id: number) {
            try {
                const result = await axios.get(apiURL + `/articles/${id}`)
                this.article = result.data.data
            } catch (e) {
                console.error(e)
            }
        },
        async getBySlug (slug: string) {
            try {
                const result = await axios.get(apiURL + `/articles/${slug}/slug`)
                this.article = result.data.data
            } catch (e) {
                console.error(e)
            }
        },
    },
    persist: true,
})