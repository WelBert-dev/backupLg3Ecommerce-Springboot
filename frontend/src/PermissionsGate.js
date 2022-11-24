
// Precisa possuir pelomenos uma das permissões do parâmetro

export const SomeHaveOneOfPermissionsGate = ({children, requiredOneOfThisPermissions, havaThisPermissions}) => {
	
	if (requiredOneOfThisPermissions
		.some(permission => {
			return havaThisPermissions.includes(permission)
		})
	) {
		return children;
	}
	
	return null;
}


// Precisa possuir TODAS as permissões do parâmetro

export const SomeHaveAllPermissionsGate = ({children, requiredAllThisPermissions, havaThisPermissions}) => {
	
	
	if (requiredAllThisPermissions
		.every(permission => {
			return havaThisPermissions.includes(permission)
		})
	) {
		return children;
	}
	
	return null;
}
