## Link to architecture diagram

[Excalidraw Architecture Diagram](https://excalidraw.com/#room=278fc5c99a45b23bfbd4,E1wFmsIIGSBlcUfn3y9EQw)

## Todo

- [x] Update tool prompt
- [x] Update RAG architecture
- [x] Update chatbot max steps structure
- [x] Update chatbot prompt
- [x] Update search for product number
- [ ] Add data collection for search queries and results (relevanceScore and similarityScore)

## Run Inngest Dev Server

```bash
pnpm dlx inngest-cli@latest dev
```

## Run Next.js Dev Server

```bash
pnpm dev
```

## Set up db tables

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:push
```

## How to embed products

When hosting inngest functions locally, you can run functions like:

- `sync-product-embeddings`
- `sync-product-embeddings-multiple`

For `sync-product-embeddings`, you need to pass in a product id, and pass it like this:

```bash
{
  "data": {"productNumber": "id"}
}
```

For `sync-product-embeddings-multiple`, you need to pass in an array of product ids, and pass it like this:

```bash
{
  "data": {"productNumbers": ["id1", "id2", "id3"]}
}
```
