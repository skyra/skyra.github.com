require "rubygems"
require 'rake'
require 'yaml'
require 'time'

SOURCE = "."
CONFIG = {
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "md",
}

CATEGORIES = [
  'blog',
  'art',
  'tech'
];

# Usage: rake post["A title",tech,2012-02-02]
desc "Begin a new post in #{CONFIG['posts']}"
task :post, [:title, :category, :date] do |t, args|
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title = args.title || "new-post"
  category = args.category || "blog"
  if not CATEGORIES.include?(category)
    abort("Invalid category name")
  end
  slug = title.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  begin
    date = (args.date ? Time.parse(args.date) : Time.now).strftime('%Y-%m-%d')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  filename = File.join(CONFIG['posts'], "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  
  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: #{title.gsub(/-/,' ')}"
    post.puts "category: #{category}"
    post.puts "---"
  end
end # task :post

desc "Launch preview environment"
task :preview do
  system "jekyll serve -w"
end # task :preview

def ask(message, valid_options)
  if valid_options
    answer = get_stdin("#{message} [#{valid_options}] ") while !valid_options.include?(answer)
  else
    answer = get_stdin(message)
  end
  answer
end

def get_stdin(message)
  print message
  STDIN.gets.chomp
end

#Load custom rake scripts
Dir['_rake/*.rake'].each { |r| load r }
