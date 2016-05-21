def page_data_array_to_s(array)
  sitemap.resources.select do |resource|
    resource.data[array] == 
end
