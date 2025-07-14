#!/bin/bash

# Script to check configuration files for standards with ErkendeStandaard status before 2025-01-01
# Only checks configuration files in the [name]/[language] folder structure

# Output file
output_file="erkende_standaarden_before_2025.csv"

# Write the header to the CSV file
echo "Title,Status,Publication Date,Specification Document URL" >"$output_file"

# Target status URL
target_status="https://data.vlaanderen.be/id/concept/StandaardStatus/ErkendeStandaard"

# Function to check if a date is before 2025-01-01
is_before_2025() {
  local date_str="$1"

  # Handle empty or "TBD" dates
  if [[ -z "$date_str" || "$date_str" == "TBD" || "$date_str" == "null" ]]; then
    return 1 # false - not before 2025
  fi

  # Extract just the date part (YYYY-MM-DD) in case there are additional strings
  local clean_date=$(echo "$date_str" | grep -oE '[0-9]{4}-[0-9]{2}-[0-9]{2}' | head -1)

  if [[ -z "$clean_date" ]]; then
    return 1 # false - invalid date format
  fi

  # Convert date to timestamp for comparison (macOS compatible)
  local date_timestamp=$(date -j -f "%Y-%m-%d" "$clean_date" "+%s" 2>/dev/null)
  local target_timestamp=$(date -j -f "%Y-%m-%d" "2025-01-01" "+%s" 2>/dev/null)

  # Check if date conversion was successful
  if [[ $? -ne 0 ]]; then
    return 1 # false - date conversion failed
  fi

  # Return true if date is before 2025-01-01
  [[ $date_timestamp -lt $target_timestamp ]]
}

# Function to process a configuration file
process_config_file() {
  local config_file="$1"
  local relative_path="$2"

  # Extract information using jq
  local title=$(jq -r '.title // "N/A"' "$config_file" 2>/dev/null)
  local status=$(jq -r '.status // "N/A"' "$config_file" 2>/dev/null)
  local publication_date=$(jq -r '.publicationDate // "N/A"' "$config_file" 2>/dev/null)
  local spec_doc_url=$(jq -r '.specificationDocuments[0].resourceReference // "N/A"' "$config_file" 2>/dev/null)

  # Check if jq failed to parse the file
  if [[ $? -ne 0 ]]; then
    echo "Warning: Failed to parse JSON in $config_file" >&2
    return 1
  fi

  # Check if status matches target status
  if [[ "$status" == "$target_status" ]]; then
    # Check if publication date is before 2025-01-01
    if is_before_2025 "$publication_date"; then
      echo "\"$title\",\"$status\",\"$publication_date\",\"$spec_doc_url\"" >>"$output_file"
      echo "Found: $title (Published: $publication_date) - Spec URL: $spec_doc_url"
      return 0
    fi
  fi
  return 1
}

# Counter for processed files
processed_count=0
found_count=0

echo "Searching for configuration files with ErkendeStandaard status before 2025-01-01..."
echo "Target status: $target_status"
echo ""

# Find all configuration.json files in the [name]/[language] directory structure
# Pattern: content/standaarden/[name]/[language]/configuration.json
while IFS= read -r -d '' config_file; do
  # Get the relative path for reporting
  relative_path=${config_file#content/standaarden/}

  # Verify this follows the [name]/nl/configuration.json pattern (only Dutch)
  if [[ "$relative_path" =~ ^[^/]+/nl/configuration\.json$ ]]; then
    ((processed_count++))

    # Process the configuration file
    if process_config_file "$config_file" "$relative_path"; then
      ((found_count++))
    fi
  else
    echo "Skipping file (not a Dutch configuration file): $config_file" >&2
  fi
done < <(find content/standaarden -path "*/nl/configuration.json" -type f -print0)

echo ""
echo "Processing complete!"
echo "Files processed: $processed_count"
echo "Standards found with ErkendeStandaard status before 2025-01-01: $found_count"
echo "Results saved to: $output_file"

# Show a preview of the results
echo ""
echo "Preview of results:"
head -10 "$output_file"

if [[ $(wc -l <"$output_file") -gt 10 ]]; then
  echo "... (showing first 10 entries, see $output_file for complete list)"
fi
