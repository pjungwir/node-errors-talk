#!/usr/bin/env ruby


def usage(msg=nil)
  puts <<-EOF
laugh.rb -q <quality> <filename>
Adds a laugh track of quality <quality> to <filename>.
Quality is an integer from 1 to 3.
The result is saved as <filename>.<quality>.out.
  EOF
  puts msg if msg
end

if ARGV.length == 3 and ARGV[0] == '-q'
  # puts "adding laughs to #{ARGV[2]}..."
  if ARGV[1] == '2' and ARGV[2] == 'boom'
    sleep 2
    # puts "error adding laughs to #{ARGV[2]}!"
    exit(1)
  else
    sleep 6
    # puts "finished adding laughs to #{ARGV[2]}..."
  end
else
  usage
  exit(1)
end

