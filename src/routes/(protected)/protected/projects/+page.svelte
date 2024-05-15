<script>
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { toast } from 'svelte-sonner';

	export let data;
</script>

<form
	method="POST"
	action="?/create"
	class="flex w-1/3 gap-2"
	use:enhance={() => {
		return async ({ result, update }) => {
			toast.success('Created new project');
			update();
		};
	}}
>
	<Input name="tag" placeholder="Project Name" />
	<Button type="submit">Create</Button>
</form>
{#if data?.projects}
	<div class="flex flex-col gap-2">
		{#each data.projects as project (project.id)}
			<div class="flex w-1/3 w-full items-center justify-between rounded border p-4">
				<span>{project.tag}</span>
				<form
					method="POST"
					action="?/delete"
					use:enhance={() => {
						return async ({ result, update }) => {
							toast.success('Deleted project');
							update();
						};
					}}
				>
					<Input hidden class="hidden" name="tag" value={project.tag} />
					<Button type="submit" variant="destructive">Delete</Button>
				</form>
			</div>
		{/each}
	</div>
{/if}
