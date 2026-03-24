const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Find global node_modules dynamically
let globalPath;
try {
    globalPath = execSync('npm root -g').toString().trim();
    console.log(`Global npm path found: ${globalPath}`);
} catch (e) {
    console.error('Could not determine global npm path.');
    process.exit(1);
}

// 2. We will look for skills inside known packages
const packagesToScan = ['openclaw', 'agent-browser'];
const allSkills = [];

// Helper to extract YAML frontmatter
function parseSkillFile(filePath, packageName) {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');
        let name = "Unknown Skill";
        let description = "No description provided.";
        
        // Match YAML frontmatter
        const yamlMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
        if (yamlMatch) {
            const yamlStr = yamlMatch[1];
            const nameMatch = yamlStr.match(/name:\s*['"]?([^'"\n]+)['"]?/);
            const descMatch = yamlStr.match(/description:\s*['"]?([^'"\n]+)['"]?/);
            
            if (nameMatch) name = nameMatch[1];
            if (descMatch) description = descMatch[1];
        }

        allSkills.push({
            id: path.basename(path.dirname(filePath)),
            name,
            description,
            package: packageName,
            path: filePath,
            content: content // Keep full markdown for the UI to display
        });
    } catch (e) {
        console.error(`Error reading ${filePath}:`, e.message);
    }
}

// 3. Scan the directories
packagesToScan.forEach(pkg => {
    const skillsDir = path.join(globalPath, pkg, 'skills');
    if (fs.existsSync(skillsDir)) {
        console.log(`Scanning skills in: ${pkg}`);
        const folders = fs.readdirSync(skillsDir);
        
        folders.forEach(folder => {
            const skillPath = path.join(skillsDir, folder, 'SKILL.md');
            if (fs.existsSync(skillPath)) {
                parseSkillFile(skillPath, pkg);
            }
        });
    }
});

// 4. Generate the static data file
const outputData = `window.SKILLS_DATA = ${JSON.stringify(allSkills, null, 2)};`;
const outputPath = path.join(__dirname, 'skills-data.js');

fs.writeFileSync(outputPath, outputData);
console.log(`\nSuccess! Extracted ${allSkills.length} skills and compiled them to skills-data.js.`);
