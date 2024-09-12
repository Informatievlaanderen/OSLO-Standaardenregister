#!/bin/bash

# Define an array of languages
languages=("nl" "en")

# Base directory
base_dir="content/standaarden"

# Loop through all directories inside content/standaarden
for dir in "$base_dir"/*/; do
  # Check if the directory contains a configuration.json file
  config_file="${dir}configuration.json"
  if [[ -f "$config_file" ]]; then
    # Read the descriptionFileName from the configuration.json
    description_file="description.md"
    # Loop through each language and create the respective directory
    for language in "${languages[@]}"; do
      lang_dir="${dir}${language}"

      mkdir -p "$lang_dir"
      echo "Creating directory: $lang_dir"

      # Move the configuration.json and markdown file to the language directory
      cp "$config_file" "$lang_dir/"
      if [[ -f "${dir}${description_file}" ]]; then
        echo "Moving file: ${dir}${description_file} to $lang_dir"
        cp "${dir}${description_file}" "$lang_dir/"
      fi

<<<<<<< HEAD
      echo "Processed directory: $dir for language: $language"
    done
    # delete configuration.json and description.md from the base directory
    rm "${dir}configuration.json"
    rm "${dir}description.md"
=======
      rm "${dir}configuration.json"
      rm "${dir}description.md"

      echo "Processed directory: $dir for language: $language"
    done
>>>>>>> 23996ab (create-lang Bash script to create language dirs inside the content-dir and forgotten translation key added)
  else
    echo "No configuration.json found in directory: $dir"
  fi
done

echo "Script completed."
