const path = require('path');
const { task, src, dest } = require('gulp');

task('build:icons', copyIcons);
task('build:index', copyIndex);

function copyIcons() {
	const nodeSource = path.resolve('nodes', '**', '*.{png,svg}');
	const nodeDestination = path.resolve('dist', 'nodes');

	src(nodeSource).pipe(dest(nodeDestination));

	const credSource = path.resolve('credentials', '**', '*.{png,svg}');
	const credDestination = path.resolve('dist', 'credentials');

	return src(credSource).pipe(dest(credDestination));
}

function copyIndex() {
	const indexSource = path.resolve('index.js');
	const indexDestination = path.resolve('dist');
	
	return src(indexSource)
		.pipe(dest(indexDestination))
		.on('end', () => {
			// Ajustar os caminhos no index.js copiado
			const fs = require('fs');
			const indexPath = path.resolve('dist', 'index.js');
			let content = fs.readFileSync(indexPath, 'utf8');
			
			// Remover ./dist/ dos requires já que agora estará dentro de dist
			content = content.replace(/\.\/dist\//g, './');
			
			fs.writeFileSync(indexPath, content);
		});
}
