start:
	docker compose -f ../docker-compose.yml up

stop:
	docker compose -f ../docker-compose.yml down

destroy:
	docker compose -f ../docker-compose.yml down -v

destroy-hard: stop destroy
	docker-compose -f ../docker-compose.yml rm -v
	docker rm -f $(docker ps -a -q)
	docker volume rm $(docker volume ls -q)

rebuild: destroy start
r: rebuild

studio:
	npx prisma studio

psql:
	docker compose -f ../docker-compose.yml run --rm postgres psql -h postgres -U postgres -P postgres

tsunami:
	docker stop $$(docker ps -a -q)
	docker rm $$(docker ps -a -q)
	docker network prune -f
	docker rmi -f $$(docker images --filter dangling=true -qa)
	docker volume rm $$(docker volume ls --filter dangling=true -q)
	docker rmi -f $$(docker images -a -q)
	docker system prune -a
