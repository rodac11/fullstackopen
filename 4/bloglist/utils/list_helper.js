const dummy = (blogs) => {

   return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce(function(sum, blog) {
	return sum + blog.likes
    }, 0)
    return total
}

const favoriteBlog = (blogs) => {
    const fav = blogs.reduce(function(max, blog) {
	if (blog.likes > max.likes) return blog
	else return max
    })
    return fav
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}

