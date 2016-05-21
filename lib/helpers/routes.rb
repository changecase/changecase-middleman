module Routes
  def self.get(name, path)
    define_method "#{name}_path" do
      path
    end
    define_method "#{name}_url" do
      path
    end
  end

  # Define your routes here
  get :home,  "/"
  get :blog,  "/blog"
  get :work,  "/work"
  get :about, "/about"

  ## Social Media
  get :tweets,      "https://twitter.com/changecase"
  get :linkedin,    "https://www.linkedin.com/in/changecase"
  get :googleplus,  "https://plus.google.com/117625331179664688155?rel=author"
  get :github,      "https://github.com/changecase"
  get :foursquare,  "https://foursquare.com/user/1616439"
  get :instagram,   "http://instagram.com/jeff_ja"
  get :flickr,      "https://www.flickr.com/photos/changecase"

end
