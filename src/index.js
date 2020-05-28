import Post from '@models/post'
import '@/styles/styles.css'
import svg from '@/assets/download'

const post = new Post('New post title', svg)

console.log('Post to string', post.toString()) 