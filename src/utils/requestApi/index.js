import axios from "axios"

import API_DOMAIN from "@config/api"

const domains = {
  core: API_DOMAIN,
}

const errors = {
  domainError: "Preencha o campo domínio!",
  urlError: "Preencha o campo url!",
  methodError: "Preencha o campo método!",
}

const verifyDomain = (domain) => {
  if (domain) return Object.keys(domains).includes(domain)
  throw new Error(errors.domainError)
}

const verifyErrors = ({ url }) => {
  if (!url) throw new Error(errors.urlError)
}

const requestApi = (content) => {
  const {
    domain = "core",
    url,
    method = "get",
    headers: hr,
    params: pr,
    body,
  } = content

  // try {
  verifyDomain(domain)
  verifyErrors(content)

  const baseURL = domains[domain]

  const headers = {
    "Content-Type": "application/json",
    ...hr,
  }

  const params = pr || {}

  return axios({
    method,
    baseURL,
    url,
    headers,
    params,
    data: body || undefined,
  })
  // } catch (err) {
  //   return err
  // }
}

export default requestApi
