const fs = require('fs')
const path = require('path')

interface IContent {
  title: string
  status: string
  usage: string
  publicationDate: string
  responsibleOrganisation: [
    {
      name: string
      resourceReference: string
    },
  ]
}

const extractTitleAndOrganization = (content: IContent): object => {
  return {
    title: content.title,
    organization:
      content.responsibleOrganisation[0]?.name ?? 'Geen organisatie gevonden',
    status: content.status,
    usage: content.usage,
    publicationDate: content.publicationDate,
  }
}

const readConfigurationFile = (fullPath: string): Promise<object> => {
  return new Promise((resolve, reject) => {
    fs.readFile(fullPath, 'utf8', (err: unknown, data: any) => {
      if (err) {
        console.error('Error reading file', fullPath, err)
        reject(err)
        return
      }
      try {
        const content = JSON.parse(data)
        const extract = extractTitleAndOrganization(content)
        resolve(extract)
      } catch (parseError) {
        console.error('Error parsing JSON', fullPath, parseError)
        reject(parseError)
      }
    })
  })
}

const processDirectory = async (dirPath: string): Promise<object[]> => {
  const dirents = fs.readdirSync(dirPath, { withFileTypes: true })
  const promises = []

  for (const dirent of dirents) {
    const fullPath = path.join(dirPath, dirent.name)
    if (dirent.isDirectory()) {
      // Recursively process subdirectories and collect their outputs
      promises.push(processDirectory(fullPath))
    } else if (dirent.isFile() && dirent.name === 'configuration.json') {
      // Process configuration files and collect their outputs
      promises.push(readConfigurationFile(fullPath))
    }
  }

  // Wait for all promises (file reads and directory processing) to resolve
  const results = await Promise.all(promises)
  // Flatten the results array and filter out undefined values
  const outputs = results.flat().filter(Boolean)

  return outputs
}

// Main function to process the directory and write the output
const main = async () => {
  try {
    const outputs = await processDirectory('content') // Replace 'content' with the path to your content directory
    fs.writeFileSync('scripts/output.json', JSON.stringify(outputs, null, 4))
    console.log('Output successfully written to scripts/output.json')
  } catch (error) {
    console.error('An error occurred:', error)
  }
}

main()
