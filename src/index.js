import Post from '@models/post'
import "./babel.js"
import '@/styles/styles.css'
import '@/styles/styles.scss'
import svg from '@/assets/download'

const post = new Post('New post title', svg)

console.log('Post to string', post.toString()) 