import { defineDocumentType, makeSource } from 'contentlayer/source-files';

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  bodyType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Blog],
});
