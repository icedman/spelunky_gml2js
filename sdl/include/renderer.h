#ifndef _RENDERER_H_
#define _RENDERER_H_

#include "context.h"
#include "game.h"
#include "entity.h"

void RenderShape(context_t *context, float *points, vector_t pos, float angle,
                 float radius, bool close);
void RenderEntities(list_t *entityList, context_t *context);
void RenderParticle(entity_t *entity, context_t *context);
void RenderExplosion(entity_t *entity, context_t *context);
void RenderFloatingText(entity_t *entity, context_t *context);

#endif // _RENDERER_H_